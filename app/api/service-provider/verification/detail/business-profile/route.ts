import { NextResponse } from "next/server";
import {
  getServiceProviderProfile,
  updateServiceProviderProfile,
} from "@/app/data-access/serviceProvider";
import { providerVerificationTwo } from "@/app/schemas/providerVerificationTwo";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { currentUser } from "@/lib/auth";
import { imageUpload } from "@/app/utils/imageUpload";

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    const formData = await request.formData();

    const imageId = await imageUpload(formData);

    console.error(formData);

    const profession = formData.get("profession") as string;
    const skills = formData.get("skills") as string;
    const description = formData.get("description") as string;
    const serviceSubCategory =
      (formData.get("serviceSubCategory") as string)?.split(",") || [];

    const validatedFields = {
      profession,
      skills,
      description,
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

    const user = await currentUser();

    const existingUser = await getServiceProviderProfile(user!.id!);

    if (!existingUser) {
      return NextResponse.json(
        { error: "Profile not found for the service provider" },
        { status: 404 }
      );
    }

    await updateServiceProviderProfile(existingUser.id, {
      profession: validated.profession,
      skills: validated.skills,
      description: validated.description,
      imageId: imageId,
      serviceSubCategory: validated.serviceSubCategory,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  }
);
