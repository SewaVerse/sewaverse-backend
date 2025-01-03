import { z } from "zod";

export const aboutSchema = z.object({
  about: z
    .string()
    .optional()
    .refine((value) => !value || value.split(/\s+/).length > 5, {
      message: "About must contain more than 5 words",
    }),
});

export type AboutSchema = z.infer<typeof aboutSchema>;
