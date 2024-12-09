import {
  UserRegisterSchema,
  userRegisterSchema,
} from "@/app/schema/authSchema";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import prisma from "@/lib/prismaClient";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (request: Request) => {
  const body = (await request.json()) as UserRegisterSchema;

  const validationError = validateRequestBody(userRegisterSchema, body);
  if (validationError) {
    return validationError; // If there's an error, return it directly
  }

  const { email, name, password, role } = body;

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
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // Handle role mapping, defaulting to 'USER' if no role is provided
  const userMapping = await prisma.userRoleMapping.create({
    data: {
      userId: user.id,
      role: role ?? "USER",
    },
  });

  // Prepare the response with user data and their roles
  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: [userMapping.role],
  };

  return NextResponse.json(userResponse);
});
