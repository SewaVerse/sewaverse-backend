import connectMongo from "@/lib/connectMongo";
import { sendEmail } from "@/lib/nodemailer";
import UserModel from "@/models/Users/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { id } = await request.json();
  try {
    await connectMongo();

    const existingUser = await UserModel.findOne({ _id: id });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    await sendEmail({
      recipientEmail: existingUser.email,
      emailType: "VERIFY",
      userId: existingUser._id,
    });
    return NextResponse.json(
      { success: true, message: "Verification link sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error sending verification email" },
      { status: 500 }
    );
  }
};
