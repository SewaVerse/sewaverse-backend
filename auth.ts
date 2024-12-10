import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { getAccountByUserId } from "./app/data-access/account";
import {
  createUserRoleMapping,
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
    signIn: "login",
  },
  events: {
    async linkAccount({ user }) {
      // update
      await updateUserById(user.id, { emailVerified: new Date() });
      // add role
      await createUserRoleMapping({
        userId: user.id,
        role: "USER",
      });
    },
  },

  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.roles && session.user) {
        session.user.roles = token.roles as string[];
      }

      if (session.user) {
        session.user.name = token.name!;
        session.user.email = token.email!;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      const roles = existingUser.roles?.map((mapping) => mapping.role) || [];

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.roles = roles;

      return token;
    },
  },
  session: { strategy: "jwt" },
});
