import db from "@/lib/db";
import { File } from "@prisma/client";
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

  const localPath = await getLocalFileUrl(savedFile.id, false);

  const updatedFile = await db.file.update({
    where: { id: savedFile.id },
    data: { localUrl: localPath },
  });

  return { file: updatedFile, fileBinary };
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
