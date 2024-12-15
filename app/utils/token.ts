import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

type TokenPayload = {
  id: string;
  email: string;
  name: string;
  isEmailVerified: boolean;
  isOAuth: boolean;
  roles: Role[];
};

export const generateToken = (payload: TokenPayload) => {
  const secretKey = process.env.AUTH_SECRET as string;
  const expiresInSeconds = 24 * 60 * 60; // 1 day in seconds

  const options = {
    expiresIn: expiresInSeconds,
  };

  // Generate the JWT token
  const token = jwt.sign(payload, secretKey, options);

  // Calculate the expiration time
  const expires = new Date(Date.now() + expiresInSeconds * 1000);

  return { token, expires };
};
