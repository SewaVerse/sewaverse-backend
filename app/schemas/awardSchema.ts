import { z } from "zod";

import { fileSchema } from "./fileSchema";

export const awardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z
    .string()
    .min(1, "Award Year is required")
    .regex(/^\d{4}$/, "Invalid year format") // Ensures the year is 4 digits
    .refine(
      (val) =>
        parseInt(val) >= 1900 && parseInt(val) <= new Date().getFullYear(),
      {
        message: "Year must be between 1900 and the current year",
      }
    ),
  awardFrom: z.string().min(1, "Award From is required"),
  awardFile: fileSchema.optional(),
});

export type AwardSchema = z.infer<typeof awardSchema>;
