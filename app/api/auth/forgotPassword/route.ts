import { generatePasswordResetToken } from "@/app/data-access/token";
import { getUserByEmail } from "@/app/data-access/user";
import { ResetSchema, resetSchema } from "@/app/schemas/authSchema";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { sendPasswordResetEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (request: Request) => {
  const body = (await request.json()) as ResetSchema;

  const [validationError, validatedFields] = validateRequestBody(
    resetSchema,
    body
  );

  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { email } = validatedFields;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return NextResponse.json({ success: false, message: "User not found" });
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return NextResponse.json({
    success: true,
    message: "Password reset email sent successfully",
  });
});
