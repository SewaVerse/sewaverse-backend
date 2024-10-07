import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/Users/User";
import connectMongo from "@/lib/connectMongo";
import { sendEmail } from "@/lib/nodemailer";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST :Forgot Password");

  try {
    const { email } = await request.json();
    const lowerCaseEmail = email.toLowerCase();
    await connectMongo();
    const existingUser = await UserModel.findOne({ email: lowerCaseEmail });

    if (existingUser && existingUser.isVerified) {
      await sendEmail({
        recipientEmail: existingUser.email,
        emailType: "RESET",
        userId: existingUser._id,
        name: existingUser.fullname || existingUser.companyName,
      });

      return NextResponse.json(
        { message: "Reset email sent !!" },
        { status: 200 }
      );
    } else {
      return (
        NextResponse.json({ message: "User Not Found" }),
        {
          status: 404,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
};
