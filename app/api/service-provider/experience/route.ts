import {
  getExistingServiceProviderProfile,
  getServiceProviderProfileById,
} from "@/app/data-access/serviceProviderProfile";
import {
  createWorkExperience,
  getWorkExperience,
} from "@/app/data-access/workExperience";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
// import { imageUpload } from "@/app/utils/imageUpload";
import { currentNextAuthUser } from "@/lib/auth";
import {
  WorkExperienceSchema,
  workExperienceSchema,
} from "@/app/schemas/workExperienceSchema";
import { NextResponse } from "next/server";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { createFile, creatPrismaFileFromFile } from "@/app/data-access/file";
import {
  getServiceProviderByUserId,
  getServiceProviderProfile,
} from "@/app/data-access/serviceProvider";
import { WorkExperience } from "@prisma/client";
import { use } from "react";

function parseWorkExperience(formData: FormData): WorkExperienceSchema {
  // Extract the JSON string containing other fields
  const json = formData.get("jsonData") as string;

  if (!json) {
    throw new Error("Missing jsonData in form data");
  }

  // Parse the JSON string into an object
  const data = JSON.parse(json) as WorkExperienceSchema;

  // Extract the file from the form data
  const experienceFile = formData.get("experienceFile") as File | null;

  // Attach the file to the `fileId` if it exists
  if (experienceFile) {
    data.fileId = { image: { file: experienceFile } };
  } else {
    data.fileId = undefined;
  }

  // Return the parsed data
  return {
    ...data,
    startDate: new Date(data.startDate), // Ensure `startDate` is a Date object
    endDate: data.endDate ? new Date(data.endDate) : null, // Ensure `endDate` is a Date or null
  };
}

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    const formData = await request.formData();

    const body = parseWorkExperience(formData);
    const [validationError, validatedFields] = validateRequestBody(
      workExperienceSchema,
      body
    );

    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    const {
      jobTitle,
      company,
      duration,
      description,
      startDate,
      endDate,
      isCurrent,
      fileId,
    } = validatedFields;

    const user = await currentNextAuthUser();
    console.error("user", user);

    const providerId = await getServiceProviderProfileById(user?.id!);
    console.error(providerId);

    return NextResponse.json(
      {
        success: true,
        message: "Work Experience validated",
        data: validatedFields,
      },
      { status: 201 }
    );
  }
);

export const GET = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    const user = await currentNextAuthUser();

    //const user = { id: "676d371669255c5de906f6ce" };
    const existingServiceProviderProfile =
      await getExistingServiceProviderProfile(user?.id!);

    if (!existingServiceProviderProfile) {
      return NextResponse.json(
        { success: false, message: "Service provider profile not found" },
        { status: 404 }
      );
    }
    const workExperience = await getWorkExperience(
      existingServiceProviderProfile!.id
    );

    return NextResponse.json(
      { success: true, message: "Work experience fetched", workExperience },
      { status: 200 }
    );
  }
);
