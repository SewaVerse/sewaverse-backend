import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    role?: string;
    name?: string;
  }

  interface Session {
    user: {
      id?: string;
      isVerified?: boolean;
      role?: string;
      name?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isVerified?: boolean;
    role?: string;
    name?: string;
  }
}
