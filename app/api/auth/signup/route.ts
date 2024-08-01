import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User";
import ServiceProviderModel from "@/models/ServiceProvider";
import CompanyModel from "@/models/Company";
import { UserRole } from "@/types/roles";
import { sendEmail } from "@/lib/nodemailer";
//import { generateOTP } from "@/lib/otp";
import {
  serviceProviderSchema,
  companySchema,
  userSchema,
} from "@/schema/index";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  await connectMongo();

  const requestData = await request.json();
  console.log("Request Data:", requestData);

  let validationResult;

  if (requestData.role === UserRole.SERVICE_PROVIDER) {
    validationResult = serviceProviderSchema.safeParse(requestData);
  } else if (requestData.role === UserRole.COMPANY) {
    validationResult = companySchema.safeParse(requestData);
  } else {
    validationResult = userSchema.safeParse(requestData);
  }

  console.log("Validation Result:", validationResult);

  if (!validationResult.success) {
    return new NextResponse(
      JSON.stringify({
        message: "Validation error",
        errors: validationResult.error.errors,
      }),
      { status: 400 }
    );
  }

  const {
    email,
    password,
    role,
    contact,
    fullname,
    profession,
    dob,
    gender,
    address,
    companyName,
    registrationNumber,
    contactPersonName,
    contactPersonPosition,
    companyAddress,
    secondaryContact,
  } = requestData;

  try {
    // Check for existing user in the other schema if role is SERVICE_PROVIDER or COMPANY
    let existingUser;

    if (role === UserRole.SERVICE_PROVIDER) {
      existingUser = await CompanyModel.findOne({
        $or: [{ email }, { contact }],
      });
      if (existingUser) {
        return new NextResponse(
          JSON.stringify({
            message: "Email or contact is already registered as a company.",
          }),
          { status: 400 }
        );
      }
    } else if (role === UserRole.COMPANY) {
      existingUser = await ServiceProviderModel.findOne({
        $or: [{ email }, { contact }],
      });
      if (existingUser) {
        return new NextResponse(
          JSON.stringify({
            message:
              "Email or contact is already registered as a service provider.",
          }),
          { status: 400 }
        );
      }
    }

    // Check if the user exists in the same schema
    if (role === UserRole.SERVICE_PROVIDER) {
      existingUser = await ServiceProviderModel.findOne({
        $or: [{ email }, { contact }],
      });
    } else if (role === UserRole.COMPANY) {
      existingUser = await CompanyModel.findOne({
        $or: [{ email }, { contact }],
      });
    } else {
      existingUser = await UserModel.findOne({ $or: [{ email }, { contact }] });
    }

    if (existingUser) {
      if (existingUser.isVerified) {
        // Case 4: User is already verified
        return new NextResponse(
          JSON.stringify({
            message: "User already exists and is verified. Please log in.",
          }),
          { status: 400 }
        );
      }

      // Case 2: Existing user is not verified
      existingUser.email = email;
      existingUser.password = password;
      existingUser.role = role;
      existingUser.contact = contact;

      if (role === UserRole.SERVICE_PROVIDER) {
        existingUser.fullname = fullname;
        existingUser.profession = profession;
        existingUser.dob = dob;
        existingUser.gender = gender;
        existingUser.address = address;
      } else if (role === UserRole.COMPANY) {
        existingUser.companyName = companyName;
        existingUser.registrationNumber = registrationNumber;
        existingUser.contactPersonName = contactPersonName;
        existingUser.contactPersonPosition = contactPersonPosition;
        existingUser.companyAddress = companyAddress;
        existingUser.secondaryContact = secondaryContact;
      }

      // const { generatedCode, expiresAt } = generateOTP();
      // existingUser.verifyCode = { generatedCode };
      // existingUser.verifyCodeExpiry = { expiresAt };
      // console.log("Updated database otp", existingUser.verifyCode);
      await existingUser.save();

      await sendEmail({
        email: existingUser.email,
        emailType: "VERIFY",
        userId: existingUser._id,
        name: existingUser.fullname || existingUser.companyName,
      });

      return new NextResponse(
        JSON.stringify({
          message:
            "User exists but is not verified. OTP has been sent to your email. Please verify your account.",
        }),
        { status: 200 }
      );
    }

    // Case 3: Register new user if no existing user matches
    let user;
    if (role === UserRole.SERVICE_PROVIDER) {
      user = new ServiceProviderModel({
        email,
        password,
        contact,
        role,
        fullname,
        profession,
        dob,
        gender,
        address,
      });
    } else if (role === UserRole.COMPANY) {
      user = new CompanyModel({
        email,
        password,
        contact,
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
        contact,
        role,
      });
    }

    try {
      const newUser = await user.save();
      // const { generatedCode, expiresAt } = generateOTP();
      // newUser.verifyCode = { generatedCode };
      // newUser.verifyCodeExpiry = { expiresAt };
      // await newUser.save();

      await sendEmail({
        email: newUser.email,
        emailType: "VERIFY",
        userId: newUser._id,
        name: newUser.fullname || newUser.companyName,
      });

      return new NextResponse(
        JSON.stringify({
          message:
            "User registered successfully. OTP has been sent to your email.",
        }),
        { status: 201 }
      );
    } catch (error: any) {
      if (error.code === 11000) {
        // Duplicate key error
        return new NextResponse(
          JSON.stringify({
            message: "A user with this email or contact already exists.",
          }),
          { status: 400 }
        );
      }

      console.error("Error:", error);
      return new NextResponse(
        JSON.stringify({
          message: "Error registering user.",
          status: 500,
        }),
        { status: 500 }
      );
    }
  } catch (error: any) {
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
