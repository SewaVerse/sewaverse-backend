import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User";
import ServiceProviderModel from "@/models/ServiceProvider";
import CompanyModel from "@/models/Company";
import { UserRole } from "@/types/roles";
import { sendEmail } from "@/lib/nodemailer";
import {
  serviceProviderSchema,
  companySchema,
  userSchema,
} from "@/schema/index";
import bcrypt from "bcrypt";
import { clear } from "console";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Signup ServiceProvider ");
  const requestData = await request.json();

  let validationResult;

  if (requestData.role === UserRole.SERVICE_PROVIDER) {
    validationResult = serviceProviderSchema.safeParse(requestData);
  } else if (requestData.role === UserRole.COMPANY) {
    validationResult = companySchema.safeParse(requestData);
  } else {
    validationResult = userSchema.safeParse(requestData);
  }

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
    name,
    address,
    email,
    password,
    role,
    contact,
    profession,
    dob,
    gender,
    companyName,
    registrationNumber,
    contactPersonName,
    contactPersonPosition,
    secondaryContact,
  } = requestData;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connectMongo();
    console.log("MongoDB Connected");
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
    } else if (role === UserRole.USER) {
      existingUser = await ServiceProviderModel.findOne({
        $or: [{ email }, { contact }],
      });
      if (existingUser) {
        return new NextResponse(
          JSON.stringify({
            message: "Email or contact already taken.",
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
      existingUser = await UserModel.findOne({
        $or: [{ email }, { contact }],
      });
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
      existingUser.password = hashedPassword;
      existingUser.role = role;
      existingUser.contact = contact;
      existingUser.address = address;

      if (role === UserRole.SERVICE_PROVIDER) {
        existingUser.name = name;
        existingUser.profession = profession;
        existingUser.dob = dob;
        existingUser.gender = gender;
      } else if (role === UserRole.COMPANY) {
        existingUser.companyName = companyName;
        existingUser.registrationNumber = registrationNumber;
        existingUser.contactPersonName = contactPersonName;
        existingUser.contactPersonPosition = contactPersonPosition;
        existingUser.secondaryContact = secondaryContact;
      }

      await existingUser.save();

      await sendEmail({
        email: existingUser.email,
        emailType: "VERIFY",
        userId: existingUser._id,
        name: existingUser.fullname || existingUser.companyName,
      });

      // console.log(existingUser._id);

      return NextResponse.json(
        {
          message:
            "User exists but is not verified. OTP has been sent to your email. Please verify your account.",
          userId: existingUser._id,
        },
        { status: 200 }
      );
    }

    // Case 3: Register new user if no existing user matches
    let user;
    if (role === UserRole.SERVICE_PROVIDER) {
      user = new ServiceProviderModel({
        name,
        email,
        password: hashedPassword,
        contact,
        role,
        profession,
        dob,
        gender,
        address,
      });
    } else if (role === UserRole.COMPANY) {
      user = new CompanyModel({
        name,
        address,
        email,
        password: hashedPassword,
        contact,
        role,
        companyName,
        registrationNumber,
        contactPersonName,
        contactPersonPosition,
        secondaryContact,
      });
    } else {
      user = new UserModel({
        name,
        address,
        email,
        password: hashedPassword,
        contact,
        role,
      });
    }

    try {
      const newUser = await user.save();

      await sendEmail({
        email: newUser.email,
        emailType: "VERIFY",
        userId: newUser._id,
        name: newUser.fullname || newUser.companyName,
      });

      return NextResponse.json(
        {
          message:
            "User registered successfully. OTP has been sent to your email.",
          userId: newUser._id,
        },
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
