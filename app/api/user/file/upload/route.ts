import { createFile } from "@/app/data-access/file";
import { fileSchema } from "@/app/schemas/fileSchema";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { getLocalFileUrl } from "@/app/utils/fileHelper";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { File as PrismaFile } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (request: Request) => {
  const formData = await request.formData();

  const inputFile = formData.get("file");

  const [validationError, validatedFields] = validateRequestBody(fileSchema, {
    file: inputFile,
  });

  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const { file } = validatedFields;

  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const prismaFile = {
    name: file.name,
    size: file.size,
    type: file.type,
  } as PrismaFile;

  // save to db
  const { savedFile } = await createFile(prismaFile, buffer);

  const fileUrl = await getLocalFileUrl(savedFile.id);

  return NextResponse.json({
    success: true,
    fileUrl,
    message: "File uploaded successfully",
  });
});
