import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});


