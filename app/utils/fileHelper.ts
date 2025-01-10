"use server";

import { promises as fs } from "fs";
import path from "path";

import { Prisma, File as PrismaFile } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import { getFileById, updateFileById } from "../data-access/file";

const mimeToExtension = (mimeType: string): string => {
  const mimeMap: { [key: string]: string } = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "application/pdf": "pdf",
    "text/plain": "txt",
    "application/zip": "zip",
    // Add more MIME types as needed
  };

  return mimeMap[mimeType] || "bin"; // Default to "bin" if MIME type is unknown
};

const checkFileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const getLocalFileUrl = async (
  id: string,
  updatePath: boolean = true,
  tx: Prisma.TransactionClient | null = null
) => {
  return  (id || updatePath || tx) && "";
};

export const getLocalFileUrlBackup = async (
  id: string,
  updatePath: boolean = true,
  tx: Prisma.TransactionClient | null = null
) => {
  const file = await getFileById(id, tx);

  if (!file) return "";

  if (!file.fileBinaries.length) return "";

  const fileBinary = file.fileBinaries[0];

  if (!fileBinary.data) return "";

  if (file.localUrl && (await checkFileExists(file.localUrl))) {
    return file.localUrl;
  }

  // Ensure `data` is not null and is of type `Uint8Array`
  const data = fileBinary.data as Uint8Array;

  // Generate a unique filename
  const uniqueId = uuidv4();
  const fileExtension = mimeToExtension(file.type);
  const filename = `${uniqueId}.${fileExtension}`; // Change extension if needed
  const filePath = path.join(process.cwd(), "public", "thunks", filename);

  console.warn(filePath, data);

  // Save file to the `public/thunks` directory
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, data); // Pass `data` directly

  const fullPath = `/thunks/${filename}`;

  if (updatePath) {
    // save file url
    await updateFileById(id, { localUrl: fullPath } as PrismaFile, tx);
  }

  return fullPath;
};
