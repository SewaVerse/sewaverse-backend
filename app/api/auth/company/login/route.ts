import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/connectMongo";
import Company from "@/models/CompanyServiceSchema";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { companyEmail, companyPassword } = reqBody;
    console.log(reqBody);

    await connectMongo();

    const existingCompany = await Company.findOne({ companyEmail });
    if (!existingCompany) {
      console.log("User not found");
      return new NextResponse(
        JSON.stringify({ message: "User not found", status: 404 })
      );
    }

    const validPassword = bcrypt.compare(
      companyPassword,
      existingCompany.companyPassword
    );
    if (!validPassword) {
      console.log("Invalid Credentials");
      return new NextResponse(
        JSON.stringify({ message: "Invalid Password", status: 401 })
      );
    }

    const tokenData = {
      id: existingCompany._id,
      email: existingCompany.companyEmail,
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
    console.log("Error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error Occured", error, status: 500 })
    );
  }
}
