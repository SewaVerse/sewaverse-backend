import {
  createCompanyDetail,
  createServiceProvider,
} from "@/app/data-access/serviceProvider";
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
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import prisma from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import {
  Gender,
  Role,
  ServiceProvider,
  User,
  UserProfile,
  UserRoleMapping,
} from "@prisma/client";
import { NextResponse } from "next/server";
import { CompanyDetails } from "./../../../../node_modules/.prisma/client/index.d";

const genderMap: { [key: string]: Gender } = {
  male: "MALE",
  female: "FEMALE",
  others: "OTHERS",
};

const roleMap: { [key: string]: Role } = {
  user: "USER",
  admin: "ADMIN",
  serviceProvider: "SERVICE_PROVIDER",
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

  const {
    email,
    name,
    password,
    roles,
    phoneNumber,
    dob,
    gender,
    address,
    serviceProvider,
  } = validatedFields;

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
  } as User);

  if (!user.id) throw new Error("Failed to create user");

  // create user profile
  const userProfile = await createUserProfile({
    phoneNumber,
    dob,
    gender: genderMap[gender],
    address,
  } as unknown as UserProfile);

  // update user
  await updateUserById(user.id, {
    userProfileId: userProfile.id,
  } as User);

  // Handle role mapping, defaulting to 'USER' if no role is provided
  const assignedRoles = roles?.length ? roles : ["user"];

  for (const role of assignedRoles) {
    await createUserRoleMapping({
      userId: user.id,
      role: roleMap[role],
    } as UserRoleMapping);
  }

  if (roles?.includes("serviceProvider") && serviceProvider) {
    const { name, email, contact, address, providerType, companyDetail } =
      serviceProvider;

    // cerate service provider
    const saveServiceProvider = await createServiceProvider({
      userId: user.id,
      name,
      email,
      contact,
      address,
      providerType,
    } as ServiceProvider);

    if (providerType === "company" && companyDetail) {
      const {
        registrationNumber,
        contactPersonName,
        contactPersonPosition,
        secondaryContact,
      } = companyDetail;
      // save compnay details
      await createCompanyDetail({
        serviceProviderId: saveServiceProvider.id,
        registrationNumber,
        contactPersonName: contactPersonName ?? null,
        contactPersonPosition: contactPersonPosition ?? null,
        secondaryContact: secondaryContact ?? null,
      } as CompanyDetails);
    }
  }

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  const response = { sucess: true, message: "Confirmation email sent!" };

  return NextResponse.json(response, { status: 200 });
});
