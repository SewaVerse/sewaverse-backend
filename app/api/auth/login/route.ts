import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User"; // Assume one collection for all users
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  await connectMongo();
  console.log("MongoDB Connected");

  const { email, password } = await request.json();

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found. Please check your credentials.",
        }),
        { status: 401 }
      );
    }

    if (!existingUser.isVerified) {
      return new NextResponse(
        JSON.stringify({
          message: "Account not verified. Please verify your account first.",
        }),
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid credentials.",
        }),
        { status: 401 }
      );
    }

    const tokenData = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Login successful.",
        tokenData,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error logging in. Please try again later.",
      }),
      { status: 500 }
    );
  }
};
