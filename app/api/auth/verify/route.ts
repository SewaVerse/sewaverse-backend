import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/Users/User";
import { UserRole } from "@/schemas/index";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import CompanyModel from "@/models/Users/Company";

export const POST = async (request: NextRequest) => {
  console.log("Running POST Request: Verify Email");
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");
    const token = searchParams.get("token");

    await connectMongo();

    const existingUser = await UserModel.findOne({
      _id,
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
        { linkedUserId: _id },
        { $set: { isVerified: true } }
      );
    } else if (existingUser.userRole === UserRole.COMPANY) {
      await CompanyModel.updateOne(
        { linkedUserId: _id },
        { $set: { isVerified: true } }
      );
    }

    return NextResponse.json(
      { message: "Email verified successfully." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
