import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  parentServiceId: z.string().optional(),
  imageId: z.string().optional(),
  isActive: z.boolean().optional().default(true),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
