import { Prisma } from "@prisma/client";

import db from "@/lib/db";

import { FileSchema } from "../schemas/fileSchema";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { creatPrismaFileFromFile } from "./file";

export const getOfferedService = dbAsyncHandler(async (id: string) => {
  return await db.offeredService.findUnique({
    where: { id },
  });
});

export const createOfferedService = dbAsyncHandler(
  async (
    data: Prisma.OfferedServiceUncheckedCreateInput,
    images: FileSchema[]
  ) => {
    return await db.$transaction(async (tx) => {
      const fileIds = [];

      for (const image of images) {
        if (!image.file) continue;

        const createFile = await creatPrismaFileFromFile(image.file, tx);
        fileIds.push(createFile.id);
      }

      return await tx.offeredService.create({
        data: {
          ...data,
          images: {
            createMany: {
              data: fileIds.map((fileId) => ({
                imageId: fileId,
              })),
            },
          },
        },
        include: {
          images: true,
        },
      });
    });
  }
);

export const updateOfferedService = dbAsyncHandler(
  async (
    id: string,
    data: Prisma.OfferedServiceUncheckedUpdateInput,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    return await prismaClient.offeredService.update({
      where: { id },
      data,
    });
  }
);

export const getOfferedServiceById = dbAsyncHandler(
  async (id: string, include?: Prisma.OfferedServiceInclude) => {
    return await db.offeredService.findUnique({
      where: { id },
      include,
    });
  }
);
