import { z } from "zod";

// export const fileSchema = z.object({
//   file: z
//     .any()
//     .refine((file) => file instanceof File, {
//       message: "Invalid file type",
//     })
//     .refine((file) => file.size > 0, {
//       message: "File is required and cannot be empty",
//     })
//     .refine((file) => file.size <= 5 * 1024 * 1024, {
//       message: "File size should not exceed 5MB",
//     }),
// });

export const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "File is required and cannot be empty",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should not exceed 5MB",
    })
    .optional(), // Allow undefined initially
});
