import { z } from "zod";

export const emailSchema = z
  .string({ message: "Email is required" })
  .email({ message: "Invalid email address" });

export const passwordSchema = z
  .string({ message: "Password is required" })
  .min(8, "Password must be at least 8 characters");

export const phoneNumberSchema = z
  .string({ message: "Phone number is required" })
  .refine((value) => /^\d{10}$/.test(value), {
    message:
      "Phone number must contain only digits and be exactly 10 characters long",
  });

export const roleSchema = z.enum(["user", "admin", "serviceProvider"], {
  message: "Each role must be one of 'user', 'admin', or 'serviceProvider'",
});

export const genderSchema = z
  .string({ message: "Gender is required" })
  .refine((value) => ["male", "female", "others"].includes(value), {
    message: "Gender must be 'male', 'female', or 'others'",
  });

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
