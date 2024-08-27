import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/connectMongo";
import Users from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Login");

  try {
    const { email, password } = await request.json();
    const lowerCaseEmail = email.toLowerCase();
    await connectMongo();
    const existingUser = await Users.findOne({
      email: lowerCaseEmail,
      userType: "admin",
    });

    if (existingUser && existingUser.isVerified) {
      const match = await bcrypt.compare(password, existingUser.password);
      // check if password is correct
      if (!match) {
        return new NextResponse(JSON.stringify("Incorrect Credentials"), {
          status: 200,
        });
      }

      const tokenData = {
        id: existingUser._id,
        email: existingUser.email,
        userType: existingUser.userType,
        joinedDate: existingUser.joinedDate,
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = new NextResponse(JSON.stringify(existingUser.userType), {
        status: 201,
      });

      response.cookies.set("token", token, { httpOnly: true });
      console.log("Login success");
      return response;
    } else {
      console.log("User not found");
      return new NextResponse(JSON.stringify("Incorrect Credentials"), {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "Login Failed" }), {
      status: 400,
    });
  }
};
