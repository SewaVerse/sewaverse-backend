import db from "@/lib/db";
import { File } from "@prisma/client";
import { dbAsyncHandler } from "../utils/dbAsyncHandler";

export const getFileById = dbAsyncHandler(async (id: string) => {
  return await db.file.findUnique({
    where: { id },
    include: {
      fileBinaries: true,
    },
  });
});

export const createFile = dbAsyncHandler(async (file: File, binary: Buffer) => {
  const savedFile = await db.file.create({
    data: file,
  });

  const fileBinary = await db.fileBinary.create({
    data: {
      data: binary,
      fileId: savedFile.id,
    },
  });

  return { savedFile, fileBinary };
});

export const updateFileById = dbAsyncHandler(async (id: string, data: File) => {
  return await db.file.update({
    where: { id },
    data,
  });
});

export const deleteFileById = dbAsyncHandler(async (id: string) => {
  return await db.file.delete({
    where: { id },
  });
});
