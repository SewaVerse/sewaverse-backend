import connectMongo from "@/lib/connectMongo";
import { UserRole } from "@/lib/constants";
import CompanyModel from "@/models/Users/Company";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import UserModel from "@/models/Users/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST Request: Verify Email");
  try {
    const { id, token } = await request.json();

    await connectMongo();

    const existingUser = await UserModel.findOne({
      _id: id,
      verifyEmailToken: token,
      verifyEmailTokenExpiry: { $gt: Date.now() },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid or expired link" },
        { status: 404 }
      );
    }
    existingUser.isVerified = true;
    existingUser.verifyEmailToken = undefined;
    existingUser.verifyEmailTokenExpiry = undefined;
    await existingUser.save();

    if (existingUser.userRole === UserRole.SERVICE_PROVIDER) {
      await ServiceProviderModel.updateOne(
        { linkedUserId: id },
        { $set: { isVerified: true } }
      );
    } else if (existingUser.userRole === UserRole.COMPANY) {
      await CompanyModel.updateOne(
        { linkedUserId: id },
        { $set: { isVerified: true } }
      );
    }

    return NextResponse.json(
      { message: "Email verified successfully.", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  return NextResponse.json({ message: "Hello" });
};
