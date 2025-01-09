import { File as FileModel, Prisma } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { getLocalFileUrl } from "../utils/fileHelper";

export const getFileById = dbAsyncHandler(
  async (id: string, tx: Prisma.TransactionClient | null = null) => {
    const prismaClient = tx || db;
    return await prismaClient.file.findUnique({
      where: { id },
      include: {
        fileBinaries: true,
      },
    });
  }
);

export const creatPrismaFileFromFile = dbAsyncHandler(
  async (file: File, tx: Prisma.TransactionClient | null = null) => {
    const prismaClient = tx || db;

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    const prismaFile = {
      name: file.name,
      size: file.size,
      type: file.type,
    } as FileModel;

    return await createFile(prismaFile, buffer, prismaClient);
  }
);

export const createFile = dbAsyncHandler(
  async (
    file: FileModel,
    binary: Buffer,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    const savedFile = await prismaClient.file.create({
      data: {
        ...file,
        fileBinaries: {
          create: { data: binary },
        },
      },
    });

    const localPath = await getLocalFileUrl(savedFile.id, false, prismaClient);

    const updatedFile = await prismaClient.file.update({
      where: { id: savedFile.id },
      data: { localUrl: localPath },
    });

    return updatedFile;
  }
);

export const updateFileById = dbAsyncHandler(
  async (
    id: string,
    data: Prisma.FileUncheckedUpdateInput,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    return await prismaClient.file.update({
      where: { id },
      data,
    });
  }
);

export const deleteFileById = dbAsyncHandler(
  async (id: string, tx: Prisma.TransactionClient | null = null) => {
    const prismaClient = tx || db;
    return await prismaClient.file.delete({
      where: { id },
    });
  }
);
