import { NextResponse } from "next/server";

import { createOfferedService } from "@/app/data-access/offeredService";
import { getServiceById } from "@/app/data-access/service";
import { getServiceProviderByUserId } from "@/app/data-access/serviceProvider";
import {
  offeredServiceSchema,
  OfferedServiceSchema,
} from "@/app/schemas/offeredSchema";
import ApiError from "@/app/utils/apiError";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { priceTypeMap } from "@/app/utils/enumMap";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getCurrentUser } from "@/lib/auth";

const parseOfferedService = (formData: FormData): OfferedServiceSchema => {
  // Get the JSON string from the form data
  const json = formData.get("jsonData") as string;

  // Parse the JSON data
  const data = JSON.parse(json) as OfferedServiceSchema;

  // Extract files from the form data
  const files = formData.getAll("images") as File[]; // Retrieve all files

  if (files.length > 0) {
    data.images = files.map((file) => ({ file })); // Map files into the desired structure
  }

  return data;
};

export const POST = roleAsyncHandler(
  ["ADMIN", "SERVICE_PROVIDER"],
  async (req: Request) => {
    const user = await getCurrentUser();

    if (!user) throw new ApiError("User not found");

    const formData = await req.formData();

    const body = parseOfferedService(formData);

    const [validationError, validatedFields] = validateRequestBody(
      offeredServiceSchema,
      body
    );
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
    }

    // check service id is valid
    const findService = await getServiceById(validatedFields.serviceId);

    if (!findService) throw new ApiError("Service not found");

    const serviceProvider = await getServiceProviderByUserId(user.id!);

    const { images, priceType, ...rest } = validatedFields;

    const saveOfferedService = {
      ...rest,
      priceType: priceTypeMap[priceType as keyof typeof priceTypeMap],
      serviceProviderId: serviceProvider!.id,
    };

    const result = await createOfferedService(saveOfferedService, images ?? []);

    return NextResponse.json(
      {
        success: true,
        message: "Offered service created successfully.",
        data: result,
      },
      { status: 201 }
    );
  }
);
