import connectMongo from "@/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/Users/User";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  console.log("Running POST request: Reset Password");

  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");
    const token = searchParams.get("token");
    const { newPassword } = await request.json();

    await connectMongo();

    const existingUser = await UserModel.findOne({
      _id,
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid or expired link" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    existingUser.password = hashedPassword;
    existingUser.forgotPasswordToken = undefined;
    existingUser.forgotPasswordTokenExpiry = undefined;

    await existingUser.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to reset password" },
      { status: 400 }
    );
  }
}
