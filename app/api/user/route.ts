import { Address, UserProfile } from "@prisma/client";
import { NextResponse } from "next/server";

import {
  createUserAddress,
  updateUserProfileByUserId,
} from "@/app/data-access/user";
import { getUserProfileByUserId } from "@/app/data-access/user/userProfile";
import { userProfileSchema } from "@/app/schemas/user/userProfile";
import ApiError from "@/app/utils/apiError";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { genderTypeMap } from "@/app/utils/enumMap";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getCurrentUser } from "@/lib/auth";

export const POST = asyncHandler(async (request: Request) => {
  console.warn("Running POST Request: Add user details");

  const body = await request.json();

  const [validationError, validatedFields] = validateRequestBody(
    userProfileSchema,
    body
  );

  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new ApiError("User not found");
  }

  const { dob, gender, address } = validatedFields;

  const existingUserProfile = await getUserProfileByUserId(user.id);
  if (!existingUserProfile) {
    throw new ApiError("User profile not found");
  }

  await updateUserProfileByUserId(user.id, {
    dob,
    gender: genderTypeMap[gender as keyof typeof genderTypeMap],
  } as UserProfile);

  await createUserAddress(existingUserProfile.id, {
    provinceId: address.provinceId,
    districtId: address.districtId,
    municipalityId: address.municipalityId,
    wardNo: address.wardNo,
    tole: address.tole ?? null,
  } as Address);

  return NextResponse.json({
    success: true,
    message: "User details added successfully",
  });
});
