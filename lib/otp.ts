import crypto from "crypto";

export const generateOTP = (): {
  generatedCode: string;
  expiresAt: number;
} => {
  const generatedCode = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 3600000; // 1 hour in milliseconds

  console.log("Code generated:", generatedCode);

  return { generatedCode, expiresAt };
};

export const verifyOTP = (
  savedOTP: { generatedCode: string; expiresAt: number },
  inputOTP: string
): boolean => {
  const isOTPValid = savedOTP.generatedCode === inputOTP;
  const isExpired = Date.now() > savedOTP.expiresAt;
  return isOTPValid && !isExpired;
};
