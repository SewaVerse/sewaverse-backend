import * as z from "zod";

export const serviceProviderSchema = z.object({
  fullname: z
    .string()
    .min(5, { message: "Minimum 5 characters" })
    .max(25, { message: "Exceeds 25 characters" }),
  profession: z.string(),
  dob: z.string(),
  gender: z.string(),
  address: z.string(),
  contact: z
    .string()
    .length(10, { message: "Contact number must be 10 digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["user", "service_provider", "company"], {
    message: "Invalid role",
  }),
  isVerified: z.boolean().optional(),
  joinedDate: z.date().optional(),
  otp: z.string().optional(),
  verifyToken: z.string().optional(),
  verifyTokenExpiry: z.date().optional(),
  forgotPasswordToken: z.string().optional(),
  forgotPasswordTokenExpiry: z.date().optional(),
});

export const companySchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "Company name is required" })
    .max(255, { message: "Company name is too long" }),
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
  companyAddress: z
    .string()
    .min(1, { message: "Company address is required" })
    .max(255, { message: "Company address is too long" }),
  secondaryContact: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
