import db from "@/lib/db";
import { AwardSchema } from "../schemas/awardSchema";
import { Award, File as PrismaFile } from "@prisma/client";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { creatPrismaFileFromFile } from "./file";

export const createAward = dbAsyncHandler(
  async (providerProfileId: string, data: AwardSchema) => {
    let file: PrismaFile | null = null;
    const { awardFile, ...rest } = data;

    if (awardFile?.file) {
      file = await creatPrismaFileFromFile(awardFile.file);
    }

    return await upsertAwardFile({
      providerProfileId,
      ...rest,
      fileId: file?.id ?? null,
    } as Award);
  }
);

export const upsertAwardFile = dbAsyncHandler(async (data: Award) => {
  if (data.id) {
    return await db.award.update({
      where: { id: data.id },
      data,
    });
  }

  return await db.award.create({
    data,
  });
});
