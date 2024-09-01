import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});


export const UserRole = {
  USER: "USER",
  SERVICE_PROVIDER: "SERVICE_PROVIDER",
  COMPANY: "COMPANY",
  ADMIN: "ADMIN",
};