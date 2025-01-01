import { z } from "zod";
import { imageSchema } from "./imageSchema";

export const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional(),
  startDate: z.date({ invalid_type_error: "Start date must be a valid date" }),
  endDate: z
    .date({ invalid_type_error: "End date must be a valid date" })
    .nullable()
    .optional(),
  isCurrent: z.boolean(),
  fileId: imageSchema.optional(),
});

export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>;
