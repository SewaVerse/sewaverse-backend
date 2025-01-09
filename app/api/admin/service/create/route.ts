import { File as PrismaFile, Service } from "@prisma/client";
import { NextResponse } from "next/server";

import { createFile } from "@/app/data-access/file";
import { createService } from "@/app/data-access/service";
import { fileSchema } from "@/app/schemas/fileSchema";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";

export const POST = asyncHandler(async (request: Request) => {
  console.error("Running POST request: Create Services");

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

  let imageId: string | null = null;

  if (file) {
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    const savedFile = await createFile(
      {
        name: file.name,
        size: file.size,
        type: file.type,
      } as PrismaFile,
      buffer
    );

    imageId = savedFile.id;
  }

  const service = await createService(
    {
      name,
      description,
      parentServiceId,
      isActive,
    } as Service,
    imageId
  );

  return NextResponse.json(
    {
      success: true,
      message: "Service created successfully",
      data: service,
    },
    { status: 201 }
  );
});
