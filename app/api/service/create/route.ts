import { Service } from "@prisma/client";
import { NextResponse } from "next/server";

import { createService } from "@/app/data-access/service";
import { fileSchema } from "@/app/schemas/fileSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getCurrentUser } from "@/lib/auth";

export const POST = roleAsyncHandler(
  ["ADMIN", "SERVICE_PROVIDER"],
  async (request: Request) => {
    const user = await getCurrentUser();

    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || null;
    const parentServiceId = formData.get("parentServiceId")?.toString() || null;
    const isActive = formData.get("isActive")?.toString() === "true";
    const inputFile = formData.get("file") as File;

    const [validationError, validatedFields] = validateRequestBody(fileSchema, {
      file: inputFile,
    });

    if (validationError) {
      return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
    }

    const { file } = validatedFields;

    const service = await createService(
      {
        name,
        description,
        parentServiceId,
        isActive,
        createdBy: user?.id,
      } as Service,
      file ?? null
    );

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: service,
      },
      { status: 201 }
    );
  }
);
