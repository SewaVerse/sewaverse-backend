import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { getServiceProviderByUserId } from "@/app/data-access/serviceProvider";
import { getUserByEmail, updateUserById } from "@/app/data-access/user";
import { userLoginSchema, UserLoginSchema } from "@/app/schemas/authSchema";
import ApiError from "@/app/utils/apiError";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { generateToken } from "@/app/utils/token";
import { validateRequestBody } from "@/app/utils/validateRequestBody";

export const POST = asyncHandler(async (request: Request) => {
  const body = (await request.json()) as UserLoginSchema;

  const [validationError, validatedFields] = validateRequestBody(
    userLoginSchema,
    body
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { email, password } = validatedFields;

  const user = await getUserByEmail(email);

  if (!user || !user.password) {
    throw new ApiError("Invalid credentials.");
  }

  if (!user.emailVerified) {
    throw new ApiError("Email not verified.");
  }

  const passwordsMatch = bcrypt.compareSync(password, user.password);

  if (!passwordsMatch) throw new ApiError("Invalid credentials.");

  const roles = user.roles.map((role) => role.role);

  let serviceProviderId: string | null = null;
  let serviceProviderProfileId: string | null = null;

  let serviceProviderVerification: {
    verificationStep: number;
    isVerified: boolean;
  } | null = null;

  if (roles.includes("SERVICE_PROVIDER")) {
    const sewaProvider = await getServiceProviderByUserId(user.id!);

    if (sewaProvider) {
      serviceProviderId = sewaProvider.id;
      if (sewaProvider.profiles.length > 0)
        serviceProviderProfileId = sewaProvider.profiles[0].id;
      serviceProviderVerification = {
        verificationStep: sewaProvider.verificationStep,
        isVerified: sewaProvider.isVerified,
      };
    }
  }

  const tokenPayload = {
    id: user.id,
    name: user.name!,
    email: user.email!,
    isEmailVerified: !!user.emailVerified,
    isOAuth: false,
    roles,
    serviceProviderId,
    serviceProviderProfileId,
    serviceProviderVerification,
  };

  // safe to generate token
  const { token, expires } = await generateToken(tokenPayload);

  // update user token
  await updateUserById(user.id!, {
    accessToken: token,
    expires,
  } as unknown as User);

  return NextResponse.json(
    {
      success: true,
      message: "login successful",
      accessToken: token,
      expires: expires.toISOString(),
      user: {
        id: user.id,
        name: user.name!,
        email: user.email,
        roles: user.roles.map((role) => role.role),
        userType: user.userType,
      },
    },
    { status: 200 }
  );
});
