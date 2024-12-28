import { Municipality } from "@prisma/client";
import { NextResponse } from "next/server";

import { getDistrictById } from "@/app/data-access/district";
import {
  createMunicipality,
  updateMunicipalityById,
} from "@/app/data-access/municipality";
import {
  municipalitySchema,
  MunicipalitySchema,
} from "@/app/schemas/addressSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { municipalityTypeMap } from "@/app/utils/enumMap";
import { validateRequestBody } from "@/app/utils/validateRequestBody";

export const POST = roleAsyncHandler("ADMIN", async (request: Request) => {
  const body = (await request.json()) as MunicipalitySchema;

  const [validationError, validatedFields] = validateRequestBody(
    municipalitySchema,
    body
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { id, name, type, districtId, published, wards } = validatedFields;

  // verify district id
  const district = await getDistrictById(districtId);

  if (!district) {
    return NextResponse.json(
      { success: false, message: "District not found by ID" },
      { status: 404 }
    );
  }

  const municipalityData = {
    name,
    type: municipalityTypeMap[type],
    districtId,
    wards,
    published: published ?? true,
  };

  if (id) {
    const updatedMunicipality = await updateMunicipalityById(
      id,
      municipalityData
    );

    return NextResponse.json({
      success: true,
      message: "Municipality updated successfully",
      data: updatedMunicipality,
    });
  } else {
    const createdMunicipality = await createMunicipality(
      municipalityData as Municipality
    );

    return NextResponse.json({
      success: true,
      message: "Municipality created successfully",
      data: createdMunicipality,
    });
  }
});
