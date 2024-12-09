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

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

const userLoginSchema = z.object({
  email: z.string({ message: "Email is required" }).email(),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

export type UserLoginSchema = z.infer<typeof userLoginSchema>;

export { userLoginSchema, userRegisterSchema };
