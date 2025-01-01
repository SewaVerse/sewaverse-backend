import { z } from "zod";
import { fileSchema } from "./fileSchema";

export const licenseSchema = z.object({
  licenseOf: z.string().min(1, "License Of is required"),
  licenseFrom: z.string().min(1, "License From is required"),
  licenseNumber: z
    .string()
    .min(1, "License Number is required")
    .max(15, "License Number should be less than 15 characters"),
  licenseFile: fileSchema.optional(),
});

export type LicenseSchema = z.infer<typeof licenseSchema>;
