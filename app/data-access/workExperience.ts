import db from "@/lib/db";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { WorkExperience } from "@prisma/client";
import { WorkExperienceSchema } from "../schemas/workExperienceSchema";
import { File as PrismaFile } from "@prisma/client";
import { creatPrismaFileFromFile } from "./file";
import { ImageSchema } from "../schemas/imageSchema";

export const createWorkExperienceFileFromSchema = dbAsyncHandler(
  async (serviceProviderId: string, data: ImageSchema) => {
    let file: PrismaFile | null = null;

    // If the image file exists, create a Prisma file
    if (data.image?.file) {
      file = await creatPrismaFileFromFile(data.image.file);
    }

    // Upsert the WorkExperience file record in the database
    return await upsertWorkExperienceFile({
      serviceProviderId,
      fileId: file?.id ?? null,
    } as unknown as WorkExperience);
  }
);

export const upsertWorkExperienceFile = dbAsyncHandler(
  async (data: WorkExperience) => {
    if (data.id) {
      // Update the existing WorkExperience file record
      return await db.workExperience.update({
        where: { id: data.id },
        data,
      });
    }

    // Create a new WorkExperience file record
    return await db.workExperience.create({
      data,
    });
  }
);

export const createWorkExperience = dbAsyncHandler(
  async (data: WorkExperience) => {
    return await db.workExperience.create({
      data,
    });
  }
);

export const getWorkExperience = dbAsyncHandler(async (id: string) => {
  return await db.workExperience.findMany({
    where: {
      providerProfileId: id,
    },
  });
});
