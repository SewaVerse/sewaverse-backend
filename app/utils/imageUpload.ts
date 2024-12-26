import { File as PrismaFile } from "@prisma/client";
import { createFile } from "@/app/data-access/file";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { profilePictureSchema } from "../schemas/profilePictureSchema";

export const imageUpload = async (
  formData: FormData
): Promise<string | null> => {
  const inputFile = formData.get("file");

  // Validate the file
  const [validationError, validatedFields] = validateRequestBody(
    profilePictureSchema,
    {
      file: inputFile,
    }
  );

  if (validationError) {
    throw new Error("File validation failed: " + validationError.message);
  }

  const { file } = validatedFields;

  // Convert file to buffer
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  // Prepare file data for saving to the database
  const prismaFile = {
    name: file.name,
    size: file.size,
    type: file.type,
  } as PrismaFile;

  // Save the file to the database
  const savedFile = await createFile(prismaFile, buffer);

  return savedFile.id; // Return the id of the saved file
};
