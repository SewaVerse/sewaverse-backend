import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import connectMongo from "@/lib/connectMongo";
import { sendEmail } from "@/lib/nodemailer";

export const POST = async (request: NextRequest) => {
  console.log("Running POST : ServiceProvider forgot password");

  try {
    await connectMongo();
    const { email } = await request.json();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "No user found" }), {
        status: 404,
      });
    }

    await sendEmail({
      email: user.email,
      emailType: "RESET",
    });
    return NextResponse.json(
      { message: "Code sent successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error Occured:", error);
    return new NextResponse(JSON.stringify({ message: "Error Occured" }), {
      status: 500,
    });
  }
};
