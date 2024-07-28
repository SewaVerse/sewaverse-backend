import * as z from "zod";

export const serviceProviderSchema = z.object({
  fullname: z
    .string()
    .min(5, { message: "Minimum 5 characters" })
    .max(25, { message: "Exceeds 25 characters" }),
  profession: z.string({ message: "Invalid profession" }),
  dob: z.string({ message: "Invalid Date of birth" }),
  gender: z.string({ message: "invalid gender" }),
  address: z.string({ message: "invalid address" }),
  contact: z.string().max(10, { message: "Invalid contact" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
