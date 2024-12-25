import { File as FileModel } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { getLocalFileUrl } from "../utils/fileHelper";

export const getFileById = dbAsyncHandler(async (id: string) => {
  return await db.file.findUnique({
    where: { id },
    include: {
      fileBinaries: true,
    },
  });
});

export const creatPrismaFileFromFile = dbAsyncHandler(async (file: File) => {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const prismaFile = {
    name: file.name,
    size: file.size,
    type: file.type,
  } as FileModel;

  return await createFile(prismaFile, buffer);
});

export const createFile = dbAsyncHandler(
  async (file: FileModel, binary: Buffer) => {
    const savedFile = await db.file.create({
      data: {
        ...file,
        fileBinaries: {
          create: { data: binary },
        },
      },
    });

    const localPath = await getLocalFileUrl(savedFile.id, false);

    const updatedFile = await db.file.update({
      where: { id: savedFile.id },
      data: { localUrl: localPath },
    });

    return updatedFile;
  }
);

export const updateFileById = dbAsyncHandler(
  async (id: string, data: FileModel) => {
    return await db.file.update({
      where: { id },
      data,
    });
  }
);

export const deleteFileById = dbAsyncHandler(async (id: string) => {
  return await db.file.delete({
    where: { id },
  });
});
