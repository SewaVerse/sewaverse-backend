import { Prisma } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { creatPrismaFileFromFile } from "./file";

// export const createMyWork = dbAsyncHandler(
//   async (providerProfileId: string, data: MyWorkSchema) => {
//     let file: PrismaFile | null = null;
//     const { myWorkFile, ...rest } = data;

//     if (myWorkFile?.file) {
//       file = await creatPrismaFileFromFile(myWorkFile.file);
//     }

//     return await upsertMyWorkFile({
//       providerProfileId,
//       ...rest,
//       fileId: file?.id ?? null,
//     } as MyWork);
//   }
// );

export const createMyWork = dbAsyncHandler(
  async (data: Prisma.MyWorkUncheckedCreateInput, file: File | null = null) => {
    return await db.$transaction(async (tx) => {
      let saveFileId = null;
      if (file) {
        const saveFile = await creatPrismaFileFromFile(file);

        saveFileId = saveFile.id;
      }

      return await tx.myWork.create({
        data: {
          ...data,
          ...(saveFileId && {
            workImages: {
              create: {
                imageId: saveFileId,
              },
            },
          }),
        },
      });

      // if (saveFileId) {
      //   tx.workImageMapping.create({
      //     data: {
      //       workId: myWork.id,
      //       imageId: saveFileId,
      //     },
      //   });
      // }

      // return myWork;
    });
  }
);

export const updateMyWorkById = dbAsyncHandler(
  async (id: string, data: Prisma.MyWorkUncheckedUpdateInput) => {
    return await db.myWork.update({
      where: { id },
      data,
    });
  }
);
