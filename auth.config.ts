import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SEC,
    // }),
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        const validatedField = LoginSchema.safeParse(credentials);
        if (validatedField.success) {
          return credentials;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
