import crypto from "crypto";

export const generateOTP = (): { otp: string; expiresAt: number } => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 300000; // 5 minutes in milliseconds

  return { otp, expiresAt };
};

export const verifyOTP = (
  savedOTP: string,
  inputOTP: string,
  expiresAt: number
): boolean => {
  const currentTime = Date.now();
  if (currentTime > expiresAt) {
    return false;
  }

  return savedOTP === inputOTP;
};
