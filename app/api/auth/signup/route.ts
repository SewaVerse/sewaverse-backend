// pages/api/register.ts
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User";
import ServiceProviderModel from "@/models/ServiceProvider";
import CompanyModel from "@/models/Company";
import { UserRole } from "@/types/roles";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  await connectMongo();

  const {
    email,
    password,
    role,
    fullname,
    profession,
    dob,
    gender,
    address,
    contact,
    companyName,
    registrationNumber,
    contactPersonName,
    contactPersonPosition,
    companyAddress,
    secondaryContact,
  } = await request.json();

  try {
    // Check if the user already exists
    let existingUser;
    if (role === UserRole.SERVICE_PROVIDER) {
      existingUser = await ServiceProviderModel.findOne({ email });
    } else if (role === UserRole.COMPANY) {
      existingUser = await CompanyModel.findOne({ email });
    } else {
      existingUser = await UserModel.findOne({ email });
    }

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User already exists.",
          status: 400,
        }),
        { status: 400 }
      );
    }

    // Create and save the new user if they don't already exist
    let user;
    if (role === UserRole.SERVICE_PROVIDER) {
      user = new ServiceProviderModel({
        email,
        password,
        role,
        fullname,
        profession,
        dob,
        gender,
        address,
        contact,
      });
    } else if (role === UserRole.COMPANY) {
      user = new CompanyModel({
        email,
        password,
        role,
        companyName,
        registrationNumber,
        contactPersonName,
        contactPersonPosition,
        companyAddress,
        secondaryContact,
      });
    } else {
      user = new UserModel({
        email,
        password,
        role,
      });
    }

    // user.generateVerificationToken(); // Uncomment if you use a verification token

    const newUser = await user.save();

    // TODO: Send verification email with user.verifyToken
    console.log(newUser);
    return new NextResponse(
      JSON.stringify({
        message: "User registered successfully. Please verify your email.",
        status: 201,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error registering user.",
        status: 500,
      }),
      { status: 500 }
    );
  }
};
