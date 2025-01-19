import { MyWork, File as PrismaFile } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { creatPrismaFileFromFile } from "./file";
import { MyWorkSchema } from "../schemas/myWorkSchema";

export const createMyWork = dbAsyncHandler(
  async (providerProfileId: string, data: MyWorkSchema) => {
    let file: PrismaFile | null = null;
    const { myWorkFile, ...rest } = data;
  
    if (myWorkFile?.file) {
      file = await creatPrismaFileFromFile(myWorkFile.file);
    }

   
    return await upsertMyWorkFile({
      providerProfileId,
      ...rest,
      fileId: file?.id ?? null,
    } as MyWork);
  }
);

export const upsertMyWorkFile = dbAsyncHandler(async (data: MyWork) => {
  if (data.id) {
  
    return await db.myWork.update({
      where: { id: data.id },
      data,
    });
  }


  return await db.myWork.create({
    data,
  });
});
