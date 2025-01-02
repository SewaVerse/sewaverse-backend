import { createLicense } from "@/app/data-access/license";
import { getServiceProviderByUserId } from "@/app/data-access/serviceProvider";
import { getServiceProviderProfileByServiceProviderId } from "@/app/data-access/serviceProviderProfile";
import { licenseSchema, LicenseSchema } from "@/app/schemas/licenseSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getcurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

function parseLicense(formData: FormData): LicenseSchema {
  const json = formData.get("jsonData") as string;
  const data = JSON.parse(json) as LicenseSchema;

  const licenseFile = formData.get("file") as File | null;

  if (licenseFile) {
    data.licenseFile = { file: licenseFile };
  }

  return data;
}

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    console.error("Running POST Request: Add License");

    const formData = await request.formData();

    const body = parseLicense(formData);

    const [validationError, validatedFields] = validateRequestBody(
      licenseSchema,
      body
    );

    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    const { licenseOf, licenseFrom, licenseNumber, licenseFile } =
      validatedFields;

    const user = await getcurrentUser();
    let serviceProvider = await getServiceProviderByUserId(user?.id!);

    const profile = await getServiceProviderProfileByServiceProviderId(
      serviceProvider?.id!
    );

    const data = await createLicense(profile?.id!, {
      licenseOf,
      licenseFrom,
      licenseNumber,
      licenseFile,
    } as LicenseSchema);

    return NextResponse.json(
      { success: true, message: "Success", data },
      { status: 201 }
    );
  }
);
