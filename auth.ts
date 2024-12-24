import { PrismaAdapter } from "@auth/prisma-adapter";
import { User, UserRoleMapping } from "@prisma/client";
import NextAuth from "next-auth";

import { getServiceProviderByUserId } from "./app/data-access/serviceProvider";
import {
  createUserRoleMapping,
  getRolesByUserId,
  getUserById,
  updateUserById,
} from "./app/data-access/user";
import authConfig from "./auth.config";
import db from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async linkAccount({ user }) {
      // update
      await updateUserById(user.id!, {
        emailVerified: new Date(),
        acceptTerms: true,
      } as User);
      // add role
      await createUserRoleMapping({
        userId: user.id,
        role: "USER",
      } as UserRoleMapping);
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.isEmailVerified = (user as User).emailVerified !== null;

        const roles = await getRolesByUserId(user.id!);

        if (roles) {
          token.roles = roles.map((role) => role.role);

          if (token.roles.includes("SERVICE_PROVIDER")) {
            const sewaProvider = await getServiceProviderByUserId(user.id!);

            if (sewaProvider) {
              token.serviceProviderVerification = {
                verificationStep: sewaProvider.verificationStep,
                isVerified: sewaProvider.isVerified,
              };
            }
          }
        }
      }

      if (account) {
        token.accessToken = account.access_token;
        token.isOAuth = account.provider !== "credentials";
      }

      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
        session.user.roles = token.roles as string[];
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.accessToken = token.accessToken as string;

        if (token.serviceProviderVerification) {
          session.user.serviceProviderVerification =
            token.serviceProviderVerification;
        }
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
