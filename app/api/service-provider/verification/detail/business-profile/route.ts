import { NextResponse } from "next/server";

import {
  getServiceProviderProfile,
  updateServiceProviderProfile,
} from "@/app/data-access/serviceProvider";
import { providerVerificationTwo } from "@/app/schemas/providerVerificationTwo";
import ApiError from "@/app/utils/apiError";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { imageUpload } from "@/app/utils/imageUpload";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getCurrentUser } from "@/lib/auth";

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    const formData = await request.formData();

    const imageId = await imageUpload(formData);

    console.warn(formData);

    const profession = formData.get("profession") as string;
    const experience = formData.get("experience") as string;

    // Parse arrays from comma-separated strings
    const location = formData.get("location")
      ? (formData.get("location") as string).split(",")
      : [];

    const serviceSubCategory = formData.get("serviceSubCategory")
      ? (formData.get("serviceSubCategory") as string).split(",")
      : [];

    const skills = formData.get("skills")
      ? (formData.get("skills") as string).split(",")
      : [];

    const validatedFields = {
      profession,
      experience,
      location,
      skills,
      serviceSubCategory,
      imageId,
    };

    const [validationError, validated] = validateRequestBody(
      providerVerificationTwo,
      validatedFields
    );
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    const user = await getCurrentUser();

    if (!user) throw new ApiError("User not found");

    const existingUser = await getServiceProviderProfile(user.id);

    if (!existingUser) {
      return NextResponse.json(
        { error: "Profile not found for the service provider" },
        { status: 404 }
      );
    }

    await updateServiceProviderProfile(existingUser.id, {
      profession: validated.profession,
      skills: validated.skills,
      experience: validated.experience,
      location: validated.location,
      // description: validated.description,
      imageId: imageId,
      serviceSubCategory: validated.serviceSubCategory,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  }
);
