import {
  Address,
  ServiceProvider,
  ServiceProviderProfile,
} from "@prisma/client";
import { NextResponse } from "next/server";

import {
  createServiceProvider,
  createServiceProviderAddress,
  createServiceProviderProfile,
  getServiceProviderByUserId,
  updateServiceProvider,
} from "@/app/data-access/serviceProvider";
import { createVerificationDocumentFromSchema } from "@/app/data-access/verificationDocument";
import {
  ProviderVerificationDetail,
  providerVerificationDetailSchema,
} from "@/app/schemas/providerVerification";
import { VerificationDocumentSchema } from "@/app/schemas/verificationSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { genderTypeMap } from "@/app/utils/enumMap";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { currentUser } from "@/lib/auth";

function parseProviderVerificationDetail(
  formData: FormData
): ProviderVerificationDetail {
  // Get the JSON string from the form data
  const json = formData.get("jsonData") as string;

  // Parse the JSON data
  const data = JSON.parse(json) as ProviderVerificationDetail;

  // Extract files from the form data
  const document1FrontFile = formData.get("document1.frontFile") as File;
  const document1BackFile = formData.get("document1.backFile") as File;
  const document2FrontFile = formData.get("document2.frontFile") as File;
  const document2BackFile = formData.get("document2.backFile") as File;

  // Update verificationDocument1 with the front and back files
  if (document1FrontFile) {
    data.verificationDocument1.frontFile = { file: document1FrontFile };
  }
  if (document1BackFile) {
    data.verificationDocument1.backFile = { file: document1BackFile };
  }

  // Update verificationDocument2 with the front and back files
  if (document2FrontFile) {
    data.verificationDocument2.frontFile = { file: document2FrontFile };
  }
  if (document2BackFile) {
    data.verificationDocument2.backFile = { file: document2BackFile };
  }

  return data;
}

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    const formData = await request.formData();

    const body = parseProviderVerificationDetail(formData);

    const [validationError, validatedFields] = validateRequestBody(
      providerVerificationDetailSchema,
      body
    );
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
    }

    const user = await currentUser();

    let serviceProvider = await getServiceProviderByUserId(user!.id!);

    if (!serviceProvider) {
      serviceProvider = await createServiceProvider({
        userId: user!.id!,
        name: user!.name!,
        email: user!.email!,
      } as ServiceProvider);
    }

    const {
      gender,
      dob,
      address,
      verificationDocument1,
      verificationDocument2,
    } = validatedFields;

    // save address
    await createServiceProviderAddress(serviceProvider.id, {
      province: address.province,
      district: address.district,
      municipality: address.municipality,
      wardNo: address.wardNo,
      tole: address.tole ?? null,
    } as Address);

    // save profile
    const profile = await createServiceProviderProfile({
      serviceProviderId: serviceProvider.id,
      gender: genderTypeMap[gender as keyof typeof genderTypeMap],
      dob,
    } as ServiceProviderProfile);

    // update service provider
    await updateServiceProvider(serviceProvider.id, {
      profileId: profile.id,
    });

    // verfication documents
    const documents = [verificationDocument1, verificationDocument2];

    for (const document of documents) {
      await createVerificationDocumentFromSchema(
        serviceProvider.id,
        document as VerificationDocumentSchema
      );
    }

    return NextResponse.json({ success: true });
  }
);