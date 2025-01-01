import { z } from "zod";
import { fileSchema } from "./fileSchema";

export const imageSchema = z.object({
  image: fileSchema.optional(),
});

export type ImageSchema = z.infer<typeof imageSchema>;
