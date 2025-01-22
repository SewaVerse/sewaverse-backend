import * as z from "zod";

import { fileSchema } from "./fileSchema";

export const myWorkSchema = z.object({
  id: z.string().optional(),
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  myWorkFile: fileSchema.optional(),
});

export type MyWorkSchema = z.infer<typeof myWorkSchema>;
