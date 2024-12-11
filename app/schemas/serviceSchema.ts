import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  imageId: z.string().optional(),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
