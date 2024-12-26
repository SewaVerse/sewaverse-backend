import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const profilePictureSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Invalid file type. Please upload a valid file.",
    })
    .refine((file) => file.size > 0, {
      message: "File is required and cannot be empty.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size should not exceed 5MB.",
    })
    .refine((file) => ALLOWED_MIME_TYPES.includes(file.type), {
      message: "Invalid file type. Allowed types are JPG, PNG, JPEG.",
    }),
});

export type ProfilePicture = z.infer<typeof profilePictureSchema>;
