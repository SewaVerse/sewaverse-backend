import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import ServiceProvider from "@/models/ServiceProviderSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    await connectMongo();
    //Check if user exists
    const serviceProviderUser = await ServiceProvider.findOne({ email });
    if (!serviceProviderUser) {
      return new NextResponse(
        JSON.stringify({ status: 404, message: "Service Provider not found" })
      );
    }

    const validaPassword = await bcrypt.compare(
      password,
      serviceProviderUser.password
    );
    if (!validaPassword) {
      return new NextResponse(
        JSON.stringify({ status: 400, message: "Invalid Credentials" })
      );
    }

    const tokenData = {
      id: serviceProviderUser._id,
      email: serviceProviderUser.email,
    };

    //create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "7d",
    });

    const response = new NextResponse(
      JSON.stringify({ status: 200, message: "Login Success", token })
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log("Error Occured", error);
    return new NextResponse(
      JSON.stringify({ status: 400, message: "Error Occured", error })
    );
  }
}
