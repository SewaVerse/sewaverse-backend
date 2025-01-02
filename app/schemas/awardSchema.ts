import { z } from "zod";
import { fileSchema } from "./fileSchema";

export const awardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const parsedDate = new Date(val);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
      return val;
    },
    z.date().refine((d) => !isNaN(d.getTime()), "Invalid date")
  ),
  awardFrom: z.string().min(1, "Award From is required"),
  awardFile: fileSchema.optional(),
});

export type AwardSchema = z.infer<typeof awardSchema>;
