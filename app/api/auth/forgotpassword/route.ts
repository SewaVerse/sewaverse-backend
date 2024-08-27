import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/Users/User";
import connectMongo from "@/lib/connectMongo";
import { sendEmail } from "@/lib/nodemailer";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST :Forgot Password");

  try {
    await connectMongo();
    console.log("MongoDB Connected");

    const { email } = await request.json();
    const lowerCaseEmail = email.toLowerCase();
    const existingUser = await UserModel.findOne({ email: lowerCaseEmail });

    if (!existingUser)
      return NextResponse.json(
        {
          message:
            "Password reset link has been sent to your email if it exists",
        },
        { status: 201 }
      );

    if (existingUser.isVerified) {
      await sendEmail({
        recipientEmail: existingUser.email,
        emailType: "RESET",
        userId: existingUser._id,
        name: existingUser.fullname || existingUser.companyName,
      });

      return NextResponse.json(
        { message: "Password reset link sent successfully." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User is not verified. Please verify first",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error Occurred:", error);
    return NextResponse.json(
      { message: "Error Occurred" },
      {
        status: 500,
      }
    );
  }
};
