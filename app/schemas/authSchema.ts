import { z } from "zod";

import {
  dobSchema,
  emailSchema,
  genderSchema,
  isMobileSchema,
  passwordSchema,
  phoneNumberSchema,
  roleSchema,
} from "./commonSchema";

// const companyDetailSchema = z.object({
//   registrationNumber: z.string({ message: "Registration number is required" }),
//   contactPersonName: z.string().optional(),
//   contactPersonPosition: z.string().optional(),
//   secondaryContact: z.string().optional(),
// });

// const serviceProviderSchema = z.object({
//   name: z
//     .string({ message: "Name is required" })
//     .min(5, { message: "Name must be at least 5 characters" }),
//   email: emailSchema,
//   contact: z.string({ message: "Contact is required" }),
//   address: z.string({ message: "Address is required" }),
//   providerType: z
//     .string({ message: "Provider type is required" })
//     .refine((val) => ["individual", "company"].includes(val), {
//       message: "Provider type must be 'individual' or 'company'",
//     }),
// });

const userRegisterSchema = z.object({
  email: emailSchema,
  name: z
    .string({ message: "Name is required" })
    .min(5, { message: "Name must be at least 5 characters" }),
  password: passwordSchema,
  phoneNumber: phoneNumberSchema,
  dob: dobSchema.optional(),
  gender: genderSchema.optional(),
  userType: z
    .string({ message: "user type is required" })
    .refine((val) => ["individual", "company"].includes(val), {
      message: "user type must be 'individual' or 'company'",
    }),
  address: z.string().optional(),
  role: roleSchema,
  acceptTerms: z
    .boolean({ required_error: "Accept terms is required" })
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
});

const userLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const resetSchema = z.object({
  email: emailSchema,
  isMobile: isMobileSchema,
});

const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

const verifyEmailSchema = z.object({
  token: z.string({ message: "Token is required" }),
});

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;
export type UserLoginSchema = z.infer<typeof userLoginSchema>;
export type ResetSchema = z.infer<typeof resetSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export {
  resetPasswordSchema,
  resetSchema,
  userLoginSchema,
  userRegisterSchema,
  verifyEmailSchema,
};
