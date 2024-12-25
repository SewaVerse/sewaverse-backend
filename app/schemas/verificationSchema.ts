import { z } from "zod";

import { verificationDocumentTypes } from "@/app/utils/enumMap";

import { fileSchema } from "./fileSchema";

export const verificationDocumentSchema = z.object({
  documentType: z
    .string({ message: "Document type is required" })
    .refine(
      (value) =>
        verificationDocumentTypes.includes(
          value as (typeof verificationDocumentTypes)[number]
        ),
      {
        message: `Document type must be one of: ${verificationDocumentTypes.join(
          ", "
        )}`,
      }
    ),
  documentNumber: z.string().optional(),
  frontFile: fileSchema.optional(),
  backFile: fileSchema.optional(),
});

export type VerificationDocumentSchema = z.infer<
  typeof verificationDocumentSchema
>;
