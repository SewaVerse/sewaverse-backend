import { z } from "zod";

// import { profilePictureSchema } from "./profilePictureSchema";

export const providerVerificationTwo = z.object({
  profession: z.string().min(1, "Profession is required"),
  skills: z.string().min(1, "Skill is required"),
  serviceSubCategory: z
    .array(z.string().min(1, "Sub Category is required"))
    .min(1, "At least one sub category is required"),
  description: z.string().min(1, "Description is required"),
  // profile: profilePictureSchema.optional(),
});

export type ProviderVerificationTwo = z.infer<typeof providerVerificationTwo>;
