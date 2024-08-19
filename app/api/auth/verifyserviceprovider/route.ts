import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User";
import { verifyOTP } from "@/lib/otp";
import { UserRole } from "@/types/roles";
import ServiceProviderModel from "@/models/ServiceProvider";
import CompanyModel from "@/models/Company";

export const POST = async (request: NextRequest) => {
  try {
    await connectMongo();

    const requestBody = await request.json();
    // console.log(requestBody);
    const { userId, code } = requestBody;
    try {
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

      console.log(" User found");
      user.isVerified = true;
      user.verifyCode = null;
      user.verifyCodeExpiry = null;
      await user.save();

      // Update the isVerified field in ServiceProvider or Company
      if (user.role === UserRole.SERVICE_PROVIDER) {
        await ServiceProviderModel.updateOne(
          { linkedUserId: userId },
          { $set: { isVerified: true } }
        );
      } else if (user.role === UserRole.COMPANY) {
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
      console.error("Error verifying Code:", error);
      return NextResponse.json({ message: "Server error." }, { status: 500 });
    }
  } catch (error) {
    console.log(error);
  }
};
