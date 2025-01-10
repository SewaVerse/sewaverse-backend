import { NextResponse } from "next/server";

import { getServiceProviderByUserId } from "@/app/data-access/serviceProvider";
import {
  getExistingServiceProviderProfile,
  getServiceProviderProfileByServiceProviderId,
} from "@/app/data-access/serviceProviderProfile";
import {
  createWorkExperience,
  getWorkExperience,
} from "@/app/data-access/workExperience";
import {
  WorkExperienceSchema,
  workExperienceSchema,
} from "@/app/schemas/workExperienceSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { currentNextAuthUser, getcurrentUser } from "@/lib/auth";

function parseWorkExperience(formData: FormData): WorkExperienceSchema {
  const json = formData.get("jsonData") as string;

  if (!json) {
    throw new Error("Missing jsonData in form data");
  }

  const data = JSON.parse(json) as WorkExperienceSchema;

  const experienceFile = formData.get("file") as File | null;

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
    const serviceProvider = await getServiceProviderByUserId(user!.id);

    const profile = await getServiceProviderProfileByServiceProviderId(
      serviceProvider!.id
    );

    const data = await createWorkExperience(profile!.id, {
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
    console.error(request.url);

    const user = await currentNextAuthUser();

    const existingServiceProviderProfile =
      await getExistingServiceProviderProfile(user!.id);

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
