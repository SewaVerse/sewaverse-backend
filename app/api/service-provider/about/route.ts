import { NextResponse } from "next/server";

import {
  getServiceProviderByUserId,
  updateServiceProviderProfile,
} from "@/app/data-access/serviceProvider";
import { getServiceProviderProfileByServiceProviderId } from "@/app/data-access/serviceProviderProfile";
import {
  AboutSchema,
  aboutSchema,
} from "@/app/schemas/providerSteps/aboutSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getcurrentUser } from "@/lib/auth";

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    const data = (await request.json()) as AboutSchema;

    const [validationError, validatedFields] = validateRequestBody(
      aboutSchema,
      data
    );

    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    const { about } = validatedFields;

    console.error("data", about);

    const user = await getcurrentUser();
    const serviceProvider = await getServiceProviderByUserId(user!.id);

    const profile = await getServiceProviderProfileByServiceProviderId(
      serviceProvider!.id
    );

    const updatedData = await updateServiceProviderProfile(profile!.id, {
      about,
    });

    return NextResponse.json(
      { success: true, message: "About added Successfully", data: updatedData },
      { status: 201 }
    );
  }
);
