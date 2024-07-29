// pages/api/register.ts
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User";
import ServiceProviderModel from "@/models/ServiceProvider";
import CompanyModel from "@/models/Company";
import { UserRole } from "@/types/roles";
import { sendEmail } from "@/lib/nodemailer";
import { generateOTP } from "@/lib/otp";

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
    let existingUser;
    if (role === UserRole.SERVICE_PROVIDER) {
      existingUser = await ServiceProviderModel.findOne({ email });
    } else if (role === UserRole.COMPANY) {
      existingUser = await CompanyModel.findOne({ email });
    } else {
      existingUser = await UserModel.findOne({ email });
    }

    if (existingUser) {
      if (!existingUser.isVerified) {
        // Generate and send OTP
        const otp = generateOTP();
        existingUser.otp = otp; // Save OTP to user record
        await existingUser.save();

        await sendEmail(
          existingUser.email,
          "Your OTP Code",
          `Your OTP code is: ${otp}\n\nPlease use this code to verify your email.`
        );
        return new NextResponse(
          JSON.stringify({
            message:
              "OTP has been sent to your email. Please verify your account.",
            status: 200,
          }),
          { status: 200 }
        );
      }

      return new NextResponse(
        JSON.stringify({
          message: "User already exists and is verified.",
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
    const otp = generateOTP(); // Generate OTP
    newUser.otp = otp; // Save OTP to user record
    await newUser.save();

    await sendEmail(
      newUser.email,
      "Welcome! Verify Your Email",
      `Hello ${
        newUser.fullname || ""
      },\n\nThank you for registering with us. Your OTP code is: ${otp}\n\nPlease use this code to verify your email.\n\nBest regards,\nThe Team`
    );
    return new NextResponse(
      JSON.stringify({
        message:
          "User registered successfully. OTP has been sent to your email.",
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
