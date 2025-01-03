import { NextResponse } from "next/server";

import { generatePasswordResetOtp } from "@/app/data-access/token";
import { getUserByEmail } from "@/app/data-access/user";
import {
  deleteOtpByEmail,
  getPasswordResetOtpByEmail,
} from "@/app/data-access/verificationOtp";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

export const POST = asyncHandler(async (request: Request) => {
  console.error("Running POST request: Verify OTP");

  const { otp, email } = await request.json();

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  if (existingUser && !existingUser.emailVerified) {
    return NextResponse.json(
      { success: false, message: "Verify your email first" },
      { status: 400 }
    );
  }

  const existingOtp = await getPasswordResetOtpByEmail(
    existingUser.email!,
    otp
  );

  if (!existingOtp) {
    return NextResponse.json(
      { success: false, message: "Invalid OTP" },
      { status: 400 }
    );
  }

  const hasExpired = new Date(existingOtp.expires) < new Date();

  if (hasExpired) {
    await generatePasswordResetOtp(existingUser.email as string);

    return NextResponse.json(
      {
        success: false,
        message: "OTP has expired. A new OTP has been sent to your email.",
      },
      { status: 400 }
    );
  }

  const passwordResetToken = await generatePasswordResetOtp(
    existingUser.email as string
  );
  await deleteOtpByEmail(existingUser.email as string);

  return NextResponse.json(
    {
      success: true,
      message: "OTP verified successfully",
      data: passwordResetToken.token,
    },
    { status: 200 }
  );
});
