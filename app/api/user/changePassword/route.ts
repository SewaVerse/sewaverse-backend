import { getUserByEmail, updateUserById } from "@/app/data-access/user";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/app/schemas/authSchema";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { hash } from "@/app/utils/common";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (request: Request) => {
  const user = await currentUser();

  if (!user)
    return new NextResponse("Unauthenticated. Please login", { status: 401 });

  const body = (await request.json()) as ResetPasswordSchema;

  const [validationError, validatedFields] = validateRequestBody(
    resetPasswordSchema,
    body
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { password } = validatedFields;

  const existingUser = await getUserByEmail(user.email);

  if (!existingUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(password);

  // update user
  await updateUserById(existingUser.id, { password: hashedPassword });

  return NextResponse.json({
    success: true,
    message: "Password changed successfully",
  });
});
