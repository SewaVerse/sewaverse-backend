import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import connectMongo from "@/lib/connectMongo";
import { sendEmail } from "@/lib/nodemailer";

export const POST = async (request: NextRequest) => {
  console.log("Running POST : ServiceProvider forgot password");

  try {
    await connectMongo();
    console.log("MongoDB Connected");

    const { email } = await request.json();
    const lowerCaseEmail = email.toLowerCase();
    const existingUser = await UserModel.findOne({ email: lowerCaseEmail });

    if (!existingUser) {
      console.log("No user found with the email:", lowerCaseEmail);
      return new NextResponse(JSON.stringify({ message: "No user found" }), {
        status: 404,
      });
    }

    if (existingUser.isVerified) {
      await sendEmail({
        email: existingUser.email,
        emailType: "RESET",
        userId: existingUser._id,
        name: existingUser.fullname || existingUser.companyName,
      });

      return NextResponse.json(
        { message: "Password reset link sent successfully." },
        { status: 200 }
      );
    } else {
      console.log("User is not verified:", existingUser.email);
      return new NextResponse(
        JSON.stringify({
          message: "User is not verified. Please verify first",
        }),
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error Occurred:", error);
    return new NextResponse(JSON.stringify({ message: "Error Occurred" }), {
      status: 500,
    });
  }
};
