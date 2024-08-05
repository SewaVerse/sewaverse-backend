import { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "./lib/connectMongo";
import UserModel from "./models/User";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials: any, req) {
        try {
          await connectMongo();
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with email");
          }
          if (!user.isVerified) {
            throw new Error(
              "User is not verified, Please verify your account first"
            );
          }
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            throw new Error("Incorrect Password");
          }
          return {
            id: user._id,
            email: user.email,
            role: user.role,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      // Add user ID and role to the token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({session, token}) {
      // Add user ID and role to the session object
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET_KEY,
};
