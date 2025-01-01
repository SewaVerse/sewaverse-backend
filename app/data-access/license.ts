import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { License, File as PrismaFile } from "@prisma/client";
import { creatPrismaFileFromFile } from "./file";
import { LicenseSchema } from "../schemas/licenseSchema";
import db from "@/lib/db";

export const createLicense = dbAsyncHandler(
  async (providerProfileId: string, data: LicenseSchema) => {
    let file: PrismaFile | null = null;
    const { licenseFile, ...rest } = data;
    // If the image file exists, create a Prisma file
    if (licenseFile?.file) {
      file = await creatPrismaFileFromFile(licenseFile.file);
    }

    // Upsert the License file record in the database
    return await upsertLicenseFile({
      providerProfileId,
      ...rest,
      fileId: file?.id ?? null,
    } as License);
  }
);

export const upsertLicenseFile = dbAsyncHandler(async (data: License) => {
  if (data.id) {
    // Update the existing License file record
    return await db.license.update({
      where: { id: data.id },
      data,
    });
  }

  // Create a new License file record
  return await db.license.create({
    data,
  });
});
