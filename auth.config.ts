import bcrypt from "bcryptjs";
import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "./app/data-access/user";
import { userLoginSchema } from "./app/schemas/authSchema";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = await userLoginSchema.parseAsync(
            credentials
          );

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) throw new Error("Invalid credentials");

          return user;
        } catch (error) {
          // Return `null` to indicate that the credentials are invalid
          console.error(error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
