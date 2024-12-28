import { headers } from "next/headers";

import { decodeToken } from "@/app/utils/token";
import { auth } from "@/auth";

export const currentNextAuthUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRoles = async () => {
  const session = await auth();

  return session?.user?.roles;
};

/**
 * Get current user from next auth or headers
 * @returns user
 */
export const getcurrentUser = async () => {
  const session = await auth();

  if (session) return session?.user;

  const headersList = await headers();
  const accessToken = headersList.get("Authorization")?.split("Bearer ")[1];

  if (!accessToken) return null;

  const decodedToken = await decodeToken(accessToken);

  if (!decodedToken) return null;

  return { ...decodedToken, accessToken };
};
