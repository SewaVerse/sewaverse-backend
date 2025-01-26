import { z } from "zod";

export const providerVerificationTwo = z.object({
  profession: z.string().min(1, "Profession is required"),
  skills: z.array(z.string().min(1, "Skill is required")),
  experience: z.string().min(1, "Experience is required"),
  location: z
    .array(z.string().min(1, "Location is required"))
    .min(1, "At least one location is required"),
  serviceSubCategory: z.array(z.string().min(1, "Sub Category is required")),
  file: z.instanceof(File).optional(),
});

export type ProviderVerificationTwo = z.infer<typeof providerVerificationTwo>;
