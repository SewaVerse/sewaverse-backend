import { creatPrismaFileFromFile } from "@/app/data-access/file";
import { validateRequestBody } from "@/app/utils/validateRequestBody";

import { fileSchema } from "../schemas/fileSchema";

export const imageUpload = async (
  formData: FormData
): Promise<string | null> => {
  const inputFile = formData.get("file");

  const [validationError, validatedFields] = validateRequestBody(fileSchema, {
    file: inputFile instanceof File ? inputFile : undefined,
  });

  if (validationError) {
    throw new Error("File validation failed: " + validationError.message);
  }

  const { file } = validatedFields;

  if (!file) return null;

  const savedFile = await creatPrismaFileFromFile(file);

  return savedFile.id;
};
