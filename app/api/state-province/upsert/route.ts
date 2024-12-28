import { StateProvince } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCountryById } from "@/app/data-access/country";
import {
  createStateProvince,
  updateStateProvinceById,
} from "@/app/data-access/stateProvince";
import {
  stateProvinceSchema,
  StateProvinceSchema,
} from "@/app/schemas/addressSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";

export const POST = roleAsyncHandler("ADMIN", async (request: Request) => {
  const body = (await request.json()) as StateProvinceSchema;

  const [validationError, validatedFields] = validateRequestBody(
    stateProvinceSchema,
    body
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { id, name, abbreviation, countryId, published } = validatedFields;

  // verify country id
  const country = await getCountryById(countryId);

  if (!country) {
    return NextResponse.json(
      { success: false, message: "Country not found by ID" },
      { status: 404 }
    );
  }

  const stateProvinceData = {
    name,
    abbreviation,
    countryId,
    published: published ?? true,
  };

  if (id) {
    const updatedState = await updateStateProvinceById(id, stateProvinceData);

    return NextResponse.json({
      success: true,
      message: "State/province updated successfully",
      data: updatedState,
    });
  } else {
    const createdState = await createStateProvince(
      stateProvinceData as StateProvince
    );

    return NextResponse.json({
      success: true,
      message: "State/province created successfully",
      data: createdState,
    });
  }
});
