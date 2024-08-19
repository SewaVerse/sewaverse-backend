import { getServerSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "./lib/connectMongo";
import UserModel from "./models/User";
import bcrypt from "bcrypt";
import ServiceProviderModel from "./models/ServiceProvider";
import CompanyModel from "./models/Company";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials: any, req) {
        try {
          console.log("Attempting login with email:", credentials.email);

          let user = await ServiceProviderModel.findOne({
            email: credentials.email,
          });
          if (!user)
            user = await CompanyModel.findOne({ email: credentials.email });
          if (!user)
            user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            console.log("User not found");
            throw new Error("Invalid Credentials");
          }
          if (!user.isVerified) {
            console.log("User is not verified");
            throw new Error(
              "User is not verified, Please verify your account first"
            );
          }
          // Check if user.password is defined and valid
          if (!user.password) {
            console.log("User password not found");
            throw new Error("User password not found");
          }

          // Log the values being compared
          console.log("Provided password:", credentials.password);
          console.log("Stored hashed password:", user.password);

          console.log("Comparing passwords...");
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            console.log("Password does not match");
            throw new Error("Invalid Credentials");
          }

          return {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
          };
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/serviceproviders/login",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET_KEY,
};
