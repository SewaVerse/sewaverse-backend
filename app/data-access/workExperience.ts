import { File as PrismaFile } from "@prisma/client";
import { WorkExperience } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { WorkExperienceSchema } from "../schemas/workExperienceSchema";
import { creatPrismaFileFromFile } from "./file";

export const createWorkExperience = dbAsyncHandler(
  async (providerProfileId: string, data: WorkExperienceSchema) => {
    let file: PrismaFile | null = null;
    const { verificationFile, description, startDate, endDate, ...rest } = data;
    // If the image file exists, create a Prisma file
    if (verificationFile?.file) {
      file = await creatPrismaFileFromFile(verificationFile.file);
    }

    // Upsert the WorkExperience file record in the database
    return await upsertWorkExperienceFile({
      providerProfileId,
      description: description ?? null,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      ...rest,
      fileId: file?.id ?? null,
    } as WorkExperience);
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

// export const createWorkExperience = dbAsyncHandler(
//   async (data: WorkExperience) => {
//     return await db.workExperience.create({
//       data,
//     });
//   }
// );

export const getWorkExperience = dbAsyncHandler(async (id: string) => {
  return await db.workExperience.findMany({
    where: {
      providerProfileId: id,
    },
  });
});
