import { User } from "@prisma/client";
import { NextResponse } from "next/server";

import { generateVerificationToken } from "@/app/data-access/token";
import { getUserByEmail, updateUserById } from "@/app/data-access/user";
import {
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from "@/app/data-access/verificationToken";
import { verifyEmailSchema, VerifyEmailSchema } from "@/app/schemas/authSchema";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { sendVerificationEmail } from "@/lib/mail";

export const POST = asyncHandler(async (request: Request) => {
  const body = (await request.json()) as VerifyEmailSchema;

  const [validationError, validatedFields] = validateRequestBody(
    verifyEmailSchema,
    body
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { token } = validatedFields;

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return NextResponse.json(
      { success: false, message: "Invalid verification token" },
      { status: 400 }
    );
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    const verificationToken = await generateVerificationToken(
      existingToken.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Verification token has expired. A new one has been sent to your email.",
      },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 400 }
    );
  }

  // update user
  await updateUserById(existingUser.id, {
    emailVerified: new Date(),
  } as User);

  await deleteVerificationTokenById(existingToken.id);

  return NextResponse.json({
    success: true,
    message: " Congratulations, your email is verified.",
  });
});
