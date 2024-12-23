import { getUserByEmail, updateUserById } from "@/app/data-access/user";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { hash } from "@/app/utils/common";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (request: Request) => {
  // const body = (await request.json()) as ResetPasswordSchema;

  const { password, email } = await request.json();

  //const { email } = await request.json();

  // const [validationError, validatedFields] = validateRequestBody(
  //   resetPasswordSchema,
  //   body
  // );
  // if (validationError) {
  //   return NextResponse.json(validationError, { status: 400 });
  // }

  // const { password } = validatedFields;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }
  console.log("Existing user", existingUser);

  const hashedPassword = await hash(password);

  await updateUserById(existingUser.id, { password: hashedPassword } as User);

  // await deletePasswordResetTokenById(existingUser.id);

  return NextResponse.json(
    { success: false, message: "Password reset successful" },
    { status: 200 }
  );
});
