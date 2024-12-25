import { z } from "zod";

import { addressSchema, dobSchema, genderSchema } from "./commonSchema";
import { verificationDocumentSchema } from "./verificationSchema";

export const providerVerificationDetailSchema = z.object({
  gender: genderSchema,
  dob: dobSchema,
  address: addressSchema,
  verificationDocument1: verificationDocumentSchema,
  verificationDocument2: verificationDocumentSchema,
});

export type ProviderVerificationDetail = z.infer<
  typeof providerVerificationDetailSchema
>;
