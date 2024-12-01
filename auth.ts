import { getUserByEmail } from "./data/user";
import connectMongo from "./lib/connectMongo";
import UserModel from "./models/Users/User";
import UserProfile from "./models/Users/UserProfile";
import authConfig from "@/auth.config";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      await connectMongo();
      const existingUser = await UserModel.findOne({ email: user.email });

      if (account?.provider !== "credentials") {
        if (existingUser) {
          if (existingUser.userRole === "USER") {
            return true;
          }
          console.error("Email already exists");
        }

        try {
          const newUser = await UserModel.create({
            name: user.name,
            email: user.email,
            isVerified: true,
            userRole: "USER",
          });

          const userProfile = await UserProfile.create({
            linkedUserId: newUser._id,
            name: user.name,
            image: user.image,
            email: user.email,
            isVerified: true,
            joinedDate: new Date(),
          });

          console.log("New UserProfile created", userProfile);

          return true;
        } catch (error) {
          console.error("Error creating user profile: ", error);
          throw new Error("Error creating user profile.");
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

      return false;
    },

    //@ts-ignore
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },

    async jwt({ token }: any) {
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
