import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getUserByEmail, getUserById } from "./data/user";
import bcrypt from "bcryptjs";
import ServiceProviderModel from "./models/ServiceProvider";
import CompanyModel from "./models/Company";
import connectMongo from "./lib/connectMongo";
import UserModel from "./models/User";
import { NextResponse } from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      const existingUser = await getUserByEmail(user.email);
      if (account?.provider !== "credentials") {
        // if (account?.provider == "google") {
        //const existingUser = await getUserByEmail(user.email);
        await connectMongo();
        if (existingUser) {
          if (existingUser.userRole === "USER") return true;
          else return false;
        }

        if (!existingUser) {
          const newUser = await UserModel.create({
            name: user.name,
            email: user.email,
            isVerified: true,
          });
          console.log("New User ", newUser);
        }
      }

      if (account?.provider === "credentials") {
        if (!existingUser || !existingUser.password) return false;
        const passwordsMatch = await bcrypt.compare(
          user.password,
          existingUser.password as string
        );
        if (!passwordsMatch) return false;
        if (!existingUser?.isVerified) return false;

        return true;
      }

      // if (existingUser) console.log("UserModel Details:", existingUser);

      // if (existingUser.userRole === "SERVICE_PROVIDER") {
      //   const userDetails = await ServiceProviderModel.findOne({
      //     linkedUserId: existingUser._id,
      //   });
      //   console.log("ServiceProvider", userDetails);
      // }

      // if (existingUser.userRole === "COMPANY") {
      //   const userDetails = await CompanyModel.findOne({
      //     linkedUserId: existingUser._id,
      //   });
      //   console.log("Comapny", userDetails);
      // }

      return false;
    },
    //@ts-ignore
    async session({ session, token }) {
      //console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.email = token.email;
        //session.user.CustomField = token.CustomField;
      }
      return session;
    },
    async jwt({ token }: any) {
      //console.log({ token });
      if (!token.sub) return token;
      const existingUser = await getUserByEmail(token.email);
      if (!existingUser) return token;
      token.name = existingUser.name;
      token.role = existingUser.userRole;
      token.email = existingUser.email;
      token.sub = existingUser._id;

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
} as any);
