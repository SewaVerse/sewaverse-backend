import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User";
import ServiceProviderModel from "@/models/ServiceProvider";
import CompanyModel from "@/models/Company";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use a secure key and store it in environment variables

export const GET = async (req: NextRequest) => {
  console.log("Running GET Request: Get Service Provider");

  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "No token provided" }, { status: 400 });
  }

  const token = authHeader.split(" ")[1];

  try {
    await connectMongo();
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let additionalInfo;
    if (user.role === "service_provider") {
      additionalInfo = await UserModel.findOne({
        email: user.email,
      });
    } else if (user.role === "company") {
      additionalInfo = await UserModel.findOne({ email: user.email });
    }

    return NextResponse.json({
      id: user._id,
      email: user.email,
      role: user.role,
      additionalInfo,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};
