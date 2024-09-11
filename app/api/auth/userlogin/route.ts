import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/Users/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: User Login");

  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      throw new Error("Request body is null");
    }

    const lowerCaseEmail = email.toLowerCase();

    await connectMongo();
    console.log("Database Connected");

    const existingUser = await UserModel.findOne({
      email: lowerCaseEmail,
      userRole: role,
    });

    if (!existingUser) {
      return new NextResponse(
        JSON.stringify({ status: "0", message: "User not found" }),
        { status: 404 }
      );
    }

    if (!existingUser.isVerified) {
      return new NextResponse(
        JSON.stringify({ status: "0", message: "User not verified" }),
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return new NextResponse(
        JSON.stringify({ status: "0", message: "Invalid password" }),
        { status: 401 }
      );
    }

    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      userType: existingUser.userType,
      joinedDate: existingUser.joinedDate,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const userProfile = await UserModel.findOne({
      linkedUserId: existingUser._id,
    });

    const payload = {
      ...existingUser._doc,
      name: userProfile?.name,
      email: userProfile?.email,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "1",
        payload: payload,
        message: "Login successful",
      }),
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });

    console.log("Login successful");
    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return new NextResponse(
      JSON.stringify({
        status: "0",
        message: "Login failed",
        error: error.message,
      }),
      { status: 400 }
    );
  }
};
