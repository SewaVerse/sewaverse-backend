import { NextResponse } from "next/server";

import { getUserByEmail } from "@/app/data-access/user";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

export const POST = asyncHandler(async (request: Request) => {
  console.error("Running POST request: Verify OTP");

  const { otp, email } = await request.json();

  console.error(otp, email);

  if (!otp) {
    return NextResponse.json(
      { success: false, message: "Invalid OTP" },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser && !existingUser?.emailVerified) {
    return NextResponse.json(
      {
        success: false,
        message: "Verify your email first",
      },
      { status: 400 }
    );
  }

  //todo validate otp

  return NextResponse.json(
    {
      success: true,
      message: "OTP verified successfull",
    },
    {
      status: 200,
    }
  );
});
