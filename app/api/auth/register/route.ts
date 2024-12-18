import { generateVerificationToken } from "@/app/data-access/token";
import {
  createUser,
  createUserProfile,
  createUserRoleMapping,
  updateUserById,
} from "@/app/data-access/user";
import {
  UserRegisterSchema,
  userRegisterSchema,
} from "@/app/schemas/authSchema";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { hash } from "@/app/utils/common";
import CustomError from "@/app/utils/customError";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import prisma from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { Role, User, UserProfile, UserRoleMapping } from "@prisma/client";
import { NextResponse } from "next/server";

// const genderMap: { [key: string]: Gender } = {
//   male: "MALE",
//   female: "FEMALE",
//   others: "OTHERS",
// };

const roleMap: { [key: string]: Role } = {
  user: "USER",
  admin: "ADMIN",
  serviceProvider: "SERVICE_PROVIDER",
};

const userTypeMap: { [key: string]: string } = {
  individual: "INDIVIDUAL",
  company: "COMPANY",
};

export const POST = asyncHandler(async (request: Request) => {
  const body = (await request.json()) as UserRegisterSchema;

  const [validationError, validatedFields] = validateRequestBody(
    userRegisterSchema,
    body
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { email, name, userType, password, role, phoneNumber, acceptTerms } =
    validatedFields;

  // Check if a user already exists with the provided email
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new CustomError("User with this email already exists");
  }

  // Hash the password
  const hashedPassword = await hash(password);

  // Create the user
  const user = await createUser({
    email,
    name,
    password: hashedPassword,
    userType: userTypeMap[userType],
    acceptTerms,
  } as User);

  if (!user.id) throw new CustomError("Failed to create user");

  // create user profile
  const userProfile = await createUserProfile({
    phoneNumber,
  } as unknown as UserProfile);

  // update user
  await updateUserById(user.id, {
    userProfileId: userProfile.id,
  } as User);

  // Handle role mapping, defaulting to 'USER' if no role is provided
  const rolesToBeAssigned = ["user"];

  if (role && role !== "user" && !rolesToBeAssigned.includes(role)) {
    rolesToBeAssigned.push(role);
  }

  for (const role of rolesToBeAssigned) {
    await createUserRoleMapping({
      userId: user.id,
      role: roleMap[role],
    } as UserRoleMapping);
  }

  // if (roles?.includes("serviceProvider") && serviceProvider) {
  //   const { name, email, contact, address, providerType, companyDetail } =
  //     serviceProvider;

  //   // cerate service provider
  //   const saveServiceProvider = await createServiceProvider({
  //     userId: user.id,
  //     name,
  //     email,
  //     contact,
  //     address,
  //     providerType,
  //   } as ServiceProvider);

  //   if (providerType === "company" && companyDetail) {
  //     const {
  //       registrationNumber,
  //       contactPersonName,
  //       contactPersonPosition,
  //       secondaryContact,
  //     } = companyDetail;
  //     // save compnay details
  //     await createCompanyDetail({
  //       serviceProviderId: saveServiceProvider.id,
  //       registrationNumber,
  //       contactPersonName: contactPersonName ?? null,
  //       contactPersonPosition: contactPersonPosition ?? null,
  //       secondaryContact: secondaryContact ?? null,
  //     } as CompanyDetails);
  //   }
  // }

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  const response = { sucess: true, message: "Confirmation email sent!" };

  return NextResponse.json(response, { status: 200 });
});
