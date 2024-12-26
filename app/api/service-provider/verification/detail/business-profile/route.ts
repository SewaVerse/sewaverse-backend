import { NextResponse } from "next/server";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { createFile } from "@/app/data-access/file";
import { serviceProviderProfileSchema } from "@/app/schemas/serviceProviderSchema";
import { fileSchema } from "@/app/schemas/fileSchema";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { createServiceProviderProfile } from "@/app/data-access/serviceProviderProfile";
import { File as PrismaFile } from "@prisma/client";

export const POST = asyncHandler(async (request: Request) => {
  const formData = await request.formData();

  const inputFile = formData.get("file") as File;
  const profession = formData.get("profession") as string;
  const skills = formData.get("skills") as string;
  const serviceSubCategory = formData.getAll("serviceSubCategory") as string[];
  const serviceProviderId = formData.get("serviceProviderId") as string;

  const [validationError, validatedFields] = validateRequestBody(
    serviceProviderProfileSchema,
    {
      profession,
      skills,
      serviceSubCategory,
      serviceProviderId,
    }
  );

  if (validationError) {
    return NextResponse.json(
      { success: false, message: "Validation failed", errors: validationError },
      { status: 400 }
    );
  }

  const [fileValidationError] = validateRequestBody(fileSchema, {
    file: inputFile,
  });

  if (fileValidationError) {
    return NextResponse.json(
      {
        success: false,
        message: "File validation failed",
        errors: fileValidationError,
      },
      { status: 400 }
    );
  }

  const {
    profession: validatedProfession,
    skills: validatedSkills,
    serviceSubCategory: validatedSubCategories,
    serviceProviderId: validatedServiceProviderId,
  } = validatedFields;

  let imageId: string | null = null;

  const file = inputFile;

 
  if (file) {
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    const prismaFile = {
      name: file.name,
      size: file.size,
      type: file.type,
    } as PrismaFile;

    const { file: savedFile } = await createFile(prismaFile, buffer);
    imageId = savedFile.id;
  }

  await createServiceProviderProfile({
    profession: validatedProfession,
    skills: validatedSkills,
    serviceSubCategory: validatedSubCategories,
    serviceProviderId: validatedServiceProviderId,
    imageId: imageId,
  });

  return NextResponse.json(
    {
      success: true,
      message: "Service provider profile created successfully",
    },
    { status: 201 }
  );
});
