import { generateVerificationToken } from "@/app/data-access/token";
import { createUser, createUserRoleMapping } from "@/app/data-access/user";
import {
  UserRegisterSchema,
  userRegisterSchema,
} from "@/app/schemas/authSchema";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { hash } from "@/app/utils/common";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import prisma from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (request: Request) => {
  const body = (await request.json()) as UserRegisterSchema;

  const [validationError, validatedFields] = validateRequestBody(
    userRegisterSchema,
    body
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { email, name, password, role } = validatedFields;

  // Check if a user already exists with the provided email
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new NextResponse("User with this email already exists", {
      status: 400,
    });
  }

  // Hash the password
  const hashedPassword = await hash(password);

  // Create the user

  const user = await createUser({
    email,
    name,
    password: hashedPassword,
  });

  // Handle role mapping, defaulting to 'USER' if no role is provided
  await createUserRoleMapping({
    userId: user.id,
    role: role ?? "USER",
  });

  // Prepare the response with user data and their roles
  // const userResponse = {
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   roles: [userRoleMapping.role],
  // };

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  const response = { sucess: true, message: "Confirmation email sent!" };

  return NextResponse.json(response);
});
