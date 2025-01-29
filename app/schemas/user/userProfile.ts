import { z } from "zod";

import { addressSchema, dobSchema, genderSchema } from "../commonSchema";

export const userProfileSchema = z.object({
  dob: dobSchema,
  gender: genderSchema,
  address: addressSchema,
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;
