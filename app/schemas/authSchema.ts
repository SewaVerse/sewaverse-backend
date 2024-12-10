import { z } from "zod";

const userRegisterSchema = z.object({
  email: z.string({ message: "Email is required" }).email(),
  name: z
    .string({ message: "Name is required" })
    .min(5, { message: "Name must be at least 5 characters" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  role: z.string().optional(),
});

const userLoginSchema = z.object({
  email: z.string({ message: "Email is required" }).email(),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  confirmPassword: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
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
