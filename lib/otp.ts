import crypto from "crypto";

export const generateOTP = (): { code: string; expiresAt: number } => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 300000; // 5 minutes in milliseconds

  return { code: otp, expiresAt };
};

export const verifyOTP = (
  savedOTP: { code: string; expiresAt: number },
  inputOTP: string
): boolean => {
  const isOTPValid = savedOTP.code === inputOTP;
  const isExpired = Date.now() > savedOTP.expiresAt;
  return isOTPValid && !isExpired;
};
