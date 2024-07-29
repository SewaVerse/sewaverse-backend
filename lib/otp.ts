// Utility functions for OTP generation and verification

export const generateOTP = (): string => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const verifyOTP = (savedOTP: string, inputOTP: string): boolean => {
  // Verify if the input OTP matches the saved OTP
  return savedOTP === inputOTP;
};
