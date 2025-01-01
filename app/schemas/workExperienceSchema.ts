import { z } from "zod";
import { fileSchema } from "./fileSchema";

export const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional(),
  startDate: z
    .date({ invalid_type_error: "Start date must be a valid date" })
    .optional()
    .nullable(),
  endDate: z
    .date({ invalid_type_error: "End date must be a valid date" })
    .optional()
    .nullable(),
  isCurrent: z.boolean(),
  serviceId: z.string(),
  verificationFile: fileSchema.optional(),
});

export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>;
