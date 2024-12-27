import { File as PrismaFile } from "@prisma/client";
import { createFile } from "@/app/data-access/file";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { fileSchema } from "../schemas/fileSchema";

export const imageUpload = async (
  formData: FormData
): Promise<string | null> => {
  const inputFile = formData.get("file");

  const [validationError, validatedFields] = validateRequestBody(fileSchema, {
    file: inputFile,
  });

  if (validationError) {
    throw new Error("File validation failed: " + validationError.message);
  }

  const { file } = validatedFields;

  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const prismaFile = {
    name: file.name,
    size: file.size,
    type: file.type,
  } as PrismaFile;

  const savedFile = await createFile(prismaFile, buffer);

  return savedFile.id;
};
