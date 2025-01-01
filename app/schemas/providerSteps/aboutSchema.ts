import { z } from "zod";

export const aboutSchema = z
  .string()
  .nonempty({ message: "About is required" });

export type AboutSchema = z.infer<typeof aboutSchema>;
