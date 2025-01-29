import { DefaultSession } from "next-auth";

interface ServiceProviderVerification {
  verificationStep: int;
  isVerified: boolean;
}

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      roles: string[]; // Add roles property
      accessToken: string;
      isOAuth: boolean;
      isEmailVerified: boolean;
      serviceProviderVerification?: ServiceProviderVerification;
      serviceProviderId: string | null;
      serviceProviderProfileId: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
    serviceProviderVerification?: ServiceProviderVerification;
    serviceProviderId: string | null;
    serviceProviderProfileId: string | null;
  }
}
