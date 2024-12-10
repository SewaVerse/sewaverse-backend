import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByToken,
} from "@/app/data-access/passwordToken";
import { getUserByEmail, updateUserById } from "@/app/data-access/user";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { hash } from "@/app/utils/common";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { NextResponse } from "next/server";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "../../../../schemas/authSchema";

export const POST = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    const token = (await params).slug;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Invalid verification token" },
        { status: 400 }
      );
    }

    const body = (await request.json()) as ResetPasswordSchema;

    const [validationError, validatedFields] = validateRequestBody(
      resetPasswordSchema,
      body
    );
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
    }

    const { password } = validatedFields;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return NextResponse.json(
        { success: false, message: "Invalid verification token" },
        { status: 400 }
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        { success: false, message: "Verification token has expired" },
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

    const hashedPassword = await hash(password);

    // update user
    await updateUserById(existingUser.id, { password: hashedPassword });

    await deletePasswordResetTokenById(existingToken.id);

    return NextResponse.json({
      success: true,
      message: "Password reset successful",
    });
  }
);
