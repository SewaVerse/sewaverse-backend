import { Country } from "@prisma/client";
import { NextResponse } from "next/server";

import { createCountry, updateCountryById } from "@/app/data-access/country";
import { countrySchema, CountrySchema } from "@/app/schemas/addressSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";

export const POST = roleAsyncHandler("ADMIN", async (request: Request) => {
  const body = (await request.json()) as CountrySchema;

  const [validationError, validatedFields] = validateRequestBody(
    countrySchema,
    body
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const {
    id,
    name,
    twoLetterIsoCode,
    threeLetterIsoCode,
    numericIsoCode,
    callingCode,
    published,
  } = validatedFields;

  const countryData = {
    name,
    twoLetterIsoCode,
    threeLetterIsoCode: threeLetterIsoCode ?? null,
    numericIsoCode: numericIsoCode ?? null,
    callingCode: callingCode ?? null,
    published: published ?? true,
  };

  if (id) {
    const updatedCountry = await updateCountryById(id, countryData);

    return NextResponse.json({
      success: true,
      message: "Country updated successfully",
      data: updatedCountry,
    });
  } else {
    const newCountry = await createCountry(countryData as Country);

    return NextResponse.json({
      success: true,
      message: "Country created successfully",
      data: newCountry,
    });
  }
});
