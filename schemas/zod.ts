import * as z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Minimum 5 characters" })
    .max(25, { message: "Exceeds 25 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  // password: z
  //   .string()
  //   .min(6, { message: "Password must be at least 6 characters long" }),
  // address: z.string(),
  // contact: z.string(),
  // role: z.enum(["USER", "SERVICE_PROVIDER", "COMPANY", "ADMIN"], {
  //   message: "Invalid role",
  // }),
  isVerified: z.boolean().optional(),
  joinedDate: z.date().optional(),
  verifyToken: z.string().optional(),
  verifyTokenExpiry: z.date().optional(),
  forgotPasswordToken: z.string().optional(),
  forgotPasswordTokenExpiry: z.date().optional(),
});

export const serviceProviderSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Minimum 5 characters" })
    .max(25, { message: "Exceeds 25 characters" }),
  dob: z.string(),
  gender: z.string(),
  serviceCategory: z.string(),
  contact: z
    .string()
    .length(10, { message: "Contact number must be 10 digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const companySchema = z.object({
  name: z
    .string()
    .min(5, { message: "Minimum 5 characters" })
    .max(25, { message: "Exceeds 25 characters" }),
  registrationNumber: z
    .string()
    .min(1, { message: "Registration number is required" })
    .max(255, { message: "Registration number is too long" }),
  contactPersonName: z
    .string()
    .min(1, { message: "Contact person name is required" })
    .max(255, { message: "Contact person name is too long" }),
  contactPersonPosition: z
    .string()
    .min(1, { message: "Contact person position is required" })
    .max(255, { message: "Contact person position is too long" }),

  secondaryContact: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
