import connectMongo from "@/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/models/User";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  console.log("Running POST request: Reset Password");

  try {
    const { token, password } = await request.json();
    await connectMongo();
    console.log("MongoDB Connected");

    const existingUser = await UserModel.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!existingUser) {
      console.log("Invalid or expired token.");
      return new NextResponse(JSON.stringify("Invalid or Expired"), {
        status: 200,
      });
    }

    console.log("User found:", existingUser.email);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Generated new hashed password:", hashedPassword);

    existingUser.password = hashedPassword;
    existingUser.forgotPasswordToken = null;
    existingUser.forgotPasswordTokenExpiry = null;

    try {
      await existingUser.save();
      console.log("Password updated successfully.");

      // Re-fetch the user to confirm the saved password
      // const updatedUser = await UserModel.findById(existingUser._id);
      // console.log("Saved hashed password:", updatedUser?.password);

      return new NextResponse(JSON.stringify("Password reset successful"), {
        status: 201,
      });
    } catch (saveError) {
      console.error("Error saving updated user:", saveError);
      return new NextResponse(
        JSON.stringify({ error: "Failed to update password" }),
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in request:", error);
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }
}
