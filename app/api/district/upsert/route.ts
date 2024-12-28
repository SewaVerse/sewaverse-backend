import { District } from "@prisma/client";
import { NextResponse } from "next/server";

import { createDistrict, updateDistrictById } from "@/app/data-access/district";
import { getStateProvinceById } from "@/app/data-access/stateProvince";
import { DistrictSchema, districtSchema } from "@/app/schemas/addressSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";

export const POST = roleAsyncHandler("ADMIN", async (request: Request) => {
  const body = (await request.json()) as DistrictSchema;

  const [validationError, validatedFields] = validateRequestBody(
    districtSchema,
    body
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { id, name, stateProvinceId, published } = validatedFields;

  // verify state province id
  const stateProvince = await getStateProvinceById(stateProvinceId);

  if (!stateProvince) {
    return NextResponse.json(
      { success: false, message: "State/Province not found by ID" },
      { status: 404 }
    );
  }

  const districtData = {
    name,
    stateProvinceId,
    published: published ?? true,
  };

  if (id) {
    const updatedDistrict = await updateDistrictById(id, districtData);

    return NextResponse.json({
      success: true,
      message: "District updated successfully",
      data: updatedDistrict,
    });
  } else {
    const newDistrict = await createDistrict(districtData as District);

    return NextResponse.json({
      success: true,
      message: "District created successfully",
      data: newDistrict,
    });
  }
});
