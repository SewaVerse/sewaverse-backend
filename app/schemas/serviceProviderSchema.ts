import { z } from "zod";
import { fileSchema } from "./fileSchema";

export const serviceProviderProfileSchema = z.object({
  profession: z.string().min(1, "Profession is required"),
  skills: z.string().min(1, "Skill is required"),
  serviceSubCategory: z
    .array(z.string().min(1, "Sub Category is required"))
    .min(1, "At least one sub category is required"),
  file: fileSchema.optional(),
  serviceProviderId: z.string(),
});

export type ServiceProviderProfileSchema = z.infer<
  typeof serviceProviderProfileSchema
>;
