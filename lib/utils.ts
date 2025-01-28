import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a fallback name based on the given name string.
 *
 * If the name is null, it returns "U". Otherwise, it takes the first letter of each
 * word in the name and uppercases it, then joins them together with no separator.
 *
 * @example getFallbackName("John Doe") => "JD"
 * @example getFallbackName(null) => "U"
 */
export const getFallbackName = (name: string | null) =>
  name
    ? name
        .split(" ")
        .map((part) => part[0].toUpperCase())
        .join("")
    : "U";

export function getImageUrl(
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

export function convertDateToReadable(dateString: string) {
  const dateObj = new Date(dateString);
  return dateObj.toISOString().split("T")[0];
}

export function truncateDescription(description: string, wordLimit = 10) {
  const words = description.split(" ");
  if (words.length <= wordLimit) {
    return description;
  }

  return words.slice(0, wordLimit).join(" ") + "...";
}

export function capitalizeFirstLetter(name: string) {
  if (!name) {
    return "";
  }

  const words = name.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
}
