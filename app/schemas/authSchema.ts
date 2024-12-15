import { z } from "zod";
import {
  dobSchema,
  emailSchema,
  genderSchema,
  passwordSchema,
  phoneNumberSchema,
  rolesSchema,
} from "./commonSchema";

const companyDetailSchema = z.object({
  registrationNumber: z.string({ message: "Registration number is required" }),
  contactPersonName: z.string().optional(),
  contactPersonPosition: z.string().optional(),
  secondaryContact: z.string().optional(),
});

const serviceProviderSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(5, { message: "Name must be at least 5 characters" }),
    email: emailSchema,
    contact: z.string({ message: "Contact is required" }),
    address: z.string({ message: "Address is required" }),
    providerType: z
      .string({ message: "Provider type is required" })
      .refine((val) => ["individual", "company"].includes(val), {
        message: "Provider type must be 'individual' or 'company'",
      }),
    companyDetail: companyDetailSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.providerType === "company" && !data.companyDetail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company detail is required for company provider type",
        path: ["companyDetail"],
      });
    }
  });

const userRegisterSchema = z
  .object({
    email: emailSchema,
    name: z
      .string({ message: "Name is required" })
      .min(5, { message: "Name must be at least 5 characters" }),
    password: passwordSchema,
    phoneNumber: phoneNumberSchema,
    dob: dobSchema,
    gender: genderSchema,
    address: z.string({ message: "Address is required" }),
    roles: rolesSchema,
    acceptTerms: z.boolean({ message: "Accept terms is required" }),
    serviceProvider: serviceProviderSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.roles &&
      data.roles.includes("serviceProvider") &&
      !data.serviceProvider
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Service provider is required for service provider role",
        path: ["serviceProvider"],
      });
    }
  });

const userLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const resetSchema = z.object({
  email: emailSchema,
});

const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;
export type UserLoginSchema = z.infer<typeof userLoginSchema>;
export type ResetSchema = z.infer<typeof resetSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export {
  resetPasswordSchema,
  resetSchema,
  userLoginSchema,
  userRegisterSchema,
};
