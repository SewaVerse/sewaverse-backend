import { NextResponse } from "next/server";

import { createMyWork } from "@/app/data-access/myWork";
import { getServiceProviderByUserId } from "@/app/data-access/serviceProvider";
import { getServiceProviderProfileByServiceProviderId } from "@/app/data-access/serviceProviderProfile";
import { myWorkSchema, MyWorkSchema } from "@/app/schemas/myWorkSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getCurrentUser } from "@/lib/auth";
import { MyWork } from "@prisma/client";

function parsemyWorks(formData: FormData): MyWorkSchema {
  const json = formData.get("jsonData") as string;
  const data = JSON.parse(json) as MyWorkSchema;

  const myWorkFile = formData.get("file") as File | null;

  if (myWorkFile) {
    data.myWorkFile = { file: myWorkFile };
  }

  return data;
}

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    console.error("Running POST Request: Add Works");

    const formData = await request.formData();

    const body = parsemyWorks(formData);

    const [validationError, validatedFields] = validateRequestBody(
      myWorkSchema,
      body
    );

    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    const { title, description, myWorkFile } =
      validatedFields;

    const user = await getCurrentUser();

    const serviceProvider = await getServiceProviderByUserId(user!.id);

    const profile = await getServiceProviderProfileByServiceProviderId(
      serviceProvider!.id
    );

    const data = await createMyWork(profile!.id, {
     title,
     description,
     myWorkFile,
    } as MyWork);

    return NextResponse.json(
      { success: true, message: "Success", data },
      { status: 201 }
    );
  }
);
