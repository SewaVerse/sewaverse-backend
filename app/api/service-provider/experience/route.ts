import {
  getExistingServiceProviderProfile,
  getServiceProviderProfileById,
  getServiceProviderProfileByServiceProviderId,
} from "@/app/data-access/serviceProviderProfile";
import {
  createWorkExperience,
  getWorkExperience,
} from "@/app/data-access/workExperience";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
// import { imageUpload } from "@/app/utils/imageUpload";
import { currentNextAuthUser, getcurrentUser } from "@/lib/auth";
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
  const json = formData.get("jsonData") as string;

  if (!json) {
    throw new Error("Missing jsonData in form data");
  }

  const data = JSON.parse(json) as WorkExperienceSchema;

  console.log(data);

  const experienceFile = formData.get("file") as File | null;

  console.log(experienceFile);

  if (experienceFile) {
    data.verificationFile = { file: experienceFile };
  }

  return {
    ...data,
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
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
      serviceId,
      isCurrent,
      verificationFile,
    } = validatedFields;

    const user = await getcurrentUser();
    let serviceProvider = await getServiceProviderByUserId(user?.id!);

    const profile = await getServiceProviderProfileByServiceProviderId(
      serviceProvider?.id!
    );

    const data = await createWorkExperience(profile?.id!, {
      jobTitle,
      company,
      duration,
      description,
      startDate,
      endDate,
      isCurrent,
      serviceId,

      verificationFile,
    } as WorkExperienceSchema);

    return NextResponse.json(
      {
        success: true,
        message: "Success",
        data,
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
