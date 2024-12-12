import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import {
  createUserRoleMapping,
  getRolesByUserId,
  getUserById,
  updateUserById,
} from "./app/data-access/user";
import authConfig from "./auth.config";
import db from "./lib/db";
import { User, UserRoleMapping } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  pages: {
    signIn: "login",
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async linkAccount({ user }) {
      // update
      await updateUserById(user.id!, { emailVerified: new Date()  } as User);
      // add role
      await createUserRoleMapping({
        userId: user.id ,
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

        const roles = await getRolesByUserId(user.id!);

        if (roles) {
          token.roles = roles.map((role) => role.role);
        }
      }

      if (account) {
        token.isOAuth = account.provider !== "credentials";
      }

      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.roles = token.roles as string[];
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
