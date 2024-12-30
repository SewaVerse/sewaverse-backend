import { z } from "zod";

import { genderTypes } from "../utils/enumMap";

export const emailSchema = z
  .string({ message: "Email is required" })
  .email({ message: "Invalid email address" });

export const passwordSchema = z
  .string({ message: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");

export const phoneNumberSchema = z
  .string({ message: "Phone number is required" })
  .refine((value) => /^(97|98)\d{8}$/.test(value), {
    message: "Invalid phone number ",
  });

export const roleSchema = z.enum(["user", "admin", "serviceProvider"], {
  message: "Each role must be one of 'user', 'admin', or 'serviceProvider'",
});

export const genderSchema = z
  .string({ message: "Gender is required" })
  .refine(
    (value) => genderTypes.includes(value as (typeof genderTypes)[number]),
    {
      message: "Gender must be 'male', 'female', or 'others'",
    }
  );

export const dobSchema = z
  .string({ message: "Date of birth is required" }) // Ensures dob is not empty
  .refine((value) => !isNaN(Date.parse(value)), {
    message: "Date of birth must be a valid date",
  }) // Ensures it's a valid date
  .refine(
    (value) => {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());
      return age > 18 || (age === 18 && hasHadBirthdayThisYear); // Minimum age: 18
    },
    { message: "You must be at least 18 years old" }
  );

export const isMobileSchema = z.boolean().optional();

export const addressSchema = z.object({
  province: z.string().nonempty({ message: "Province is required" }),
  district: z.string().nonempty({ message: "District is required" }),
  municipality: z.string().nonempty({ message: "Municipality is required" }),
  wardNo: z
    .number({ invalid_type_error: "Ward number must be a number" })
    .min(1, { message: "Ward number must be at least 1" })
    .max(99, { message: "Ward number must be less than 100" }),
  tole: z.string().optional(),
});
