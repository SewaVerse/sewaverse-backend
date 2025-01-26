import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrlFromPrismaFile(
  file: Prisma.FileGetPayload<{ include: { fileBinaries: true } }> | null
): string {
  if (!file) return "";

  if (!file.fileBinaries || file.fileBinaries.length === 0) {
    return ""; // No binary data available
  }

  const binaryData = file.fileBinaries[0].data;
  if (!binaryData) {
    return ""; // Binary data is null
  }

  const uint8Array =
    binaryData instanceof Uint8Array
      ? binaryData
      : new Uint8Array(Object.values(binaryData));

  // Convert Uint8Array to Buffer
  const bufferData = Buffer.from(uint8Array);

  const base64String = bufferData.toString("base64");
  return `data:${file.type};base64,${base64String}`;
}
