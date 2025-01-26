import { NextResponse } from "next/server";

import { createAward } from "@/app/data-access/award";
import { getServiceProviderByUserId } from "@/app/data-access/serviceProvider";
import { getServiceProviderProfileByServiceProviderId } from "@/app/data-access/serviceProviderProfile";
import { awardSchema, AwardSchema } from "@/app/schemas/awardSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getCurrentUser } from "@/lib/auth";

function parseAward(formData: FormData): AwardSchema {
  const json = formData.get("jsonData") as string;

  const data = JSON.parse(json) as AwardSchema;

  const awardFile = formData.get("file") as File | null;

  if (awardFile) {
    data.awardFile = { file: awardFile };
  }

  return data;
}

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    const formData = await request.formData();

    const body = parseAward(formData);

    const [validationError, validatedFields] = validateRequestBody(
      awardSchema,
      body
    );

    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    const { title, year, awardFrom, awardFile } = validatedFields;

    const user = await getCurrentUser();
    const serviceProvider = await getServiceProviderByUserId(user!.id);

    const profile = await getServiceProviderProfileByServiceProviderId(
      serviceProvider!.id
    );

    const data = await createAward(profile!.id, {
      title,
      year,
      awardFrom,
      awardFile,
    } as AwardSchema);

    return NextResponse.json(
      { success: true, message: "Success", data },
      { status: 201 }
    );
  }
);
