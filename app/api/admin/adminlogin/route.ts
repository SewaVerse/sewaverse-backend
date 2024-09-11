import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/connectMongo";
import Users from "@/models/Users/User";
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
      userRole: "ADMIN",
    });

    if (existingUser && existingUser.isVerified) {
      const match = await bcrypt.compare(password, existingUser.password);

      if (!match) {
        return NextResponse.json(
          { message: "Incorrect Credentials" },
          {
            status: 200,
          }
        );
      }

      const tokenData = {
        id: existingUser._id,
        email: existingUser.email,
        userRole: existingUser.userRole,
        joinedDate: existingUser.joinedDate,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json(existingUser.userRole, {
        status: 201,
      });

      response.cookies.set("token", token, { httpOnly: true });
      console.log("Login success", tokenData);
      return response;
    } else {
      console.log("User not found");
      return NextResponse.json(
        { message: "Incorrect Credentials" },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Login Failed" },
      {
        status: 400,
      }
    );
  }
};
