import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User";
import { verifyOTP } from "@/lib/otp";
import { UserRole } from "@/schemas/index";
import ServiceProviderModel from "@/models/ServiceProvider";
import CompanyModel from "@/models/Company";

export const POST = async (request: NextRequest) => {
  try {
    await connectMongo();

    const requestBody = await request.json();
    const { userId, code } = requestBody;

    const user = await UserModel.findById(userId);

    if (!user) {
      console.log("User not found");
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    if (
      !verifyOTP(
        { generatedCode: user.verifyCode, expiresAt: user.verifyCodeExpiry },
        code
      )
    ) {
      return NextResponse.json(
        { message: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyCode = null;
    user.verifyCodeExpiry = null;
    await user.save();

    if (user.userRole === UserRole.SERVICE_PROVIDER) {
      await ServiceProviderModel.updateOne(
        { linkedUserId: userId },
        { $set: { isVerified: true } }
      );
    } else if (user.userRole === UserRole.COMPANY) {
      await CompanyModel.updateOne(
        { linkedUserId: userId },
        { $set: { isVerified: true } }
      );
    }

    return NextResponse.json(
      { message: "Code verified successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error verifying code:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
};
