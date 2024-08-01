import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User"; // Assume one collection for all users
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  await connectMongo();
  console.log("Database Connected");

  const { email, password } = await request.json();

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found. Please check your credentials.",
        }),
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return new NextResponse(
        JSON.stringify({
          message: "Account not verified. Please verify your account first.",
        }),
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid credentials.",
        }),
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Login successful.",
        token,
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
