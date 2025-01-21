import { z } from "zod";

import { priceTypes } from "../utils/enumMap";
import { fileSchema } from "./fileSchema";

export const offeredServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  serviceId: z.string().min(1, "Service is required"),
  price: z.number().min(1, "Price is required"),
  priceType: z
    .string({ message: "Price type is required" })
    .refine(
      (value) => priceTypes.includes(value as (typeof priceTypes)[number]),
      {
        message: "Price type is invalid",
      }
    ),
  discount: z.number().optional(),
  published: z.boolean().optional().default(true),
  images: z.array(fileSchema).optional(),
});

export type OfferedServiceSchema = z.infer<typeof offeredServiceSchema>;
