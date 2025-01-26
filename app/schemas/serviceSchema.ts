import { z } from "zod";

export const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  parentServiceId: z.string().optional(),
  imageId: z.string().optional(),
  isActive: z.boolean().optional().default(true),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;

export const parentChildServiceSchema = z.object({
  parentServiceName: z.string().min(1, "Parent service name is required"),
  childServiceName: z.string().min(1, "Child service name is required"),
});

export type ParentChildServiceSchema = z.infer<typeof parentChildServiceSchema>;
