import { Role } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";

type TokenPayload = {
  id: string;
  email: string;
  name: string;
  isEmailVerified: boolean;
  isOAuth: boolean;
  roles: Role[];
};

export const generateToken = async (payload: TokenPayload) => {
  const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET); // Convert secret to Uint8Array
  const expiresInSeconds = 24 * 60 * 60; // 1 day in seconds

  // Generate the JWT token
  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${expiresInSeconds}s`)
    .setIssuedAt()
    .setNotBefore("0s")
    .sign(secretKey);

  // Calculate the expiration time
  const expires = new Date(Date.now() + expiresInSeconds * 1000);

  return { token, expires };
};

export const decodeToken = async (
  token: string
): Promise<TokenPayload | null> => {
  const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET); // Convert secret to Uint8Array

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as TokenPayload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
