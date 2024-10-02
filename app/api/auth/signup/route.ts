import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/Users/User";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import CompanyModel from "@/models/Users/Company";
import {
  userSchema,
  serviceProviderSchema,
  companySchema,
} from "@/schemas/zod";
import bcrypt from "bcryptjs";
import connectMongo from "@/lib/connectMongo";
import { sendEmail } from "@/lib/nodemailer";
import { UserRole } from "@/schemas";

export const POST = async (request: NextRequest) => {
  console.log("Running POST Request: Signup");

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
    return NextResponse.json(
      {
        message: "Validation error",
        errors: validationResult.error.errors,
      },
      { status: 400 }
    );
  }

  try {
    const {
      name,
      email,
      password,
      role,
      contact,
      address,
      profession,
      dob,
      gender,
      registrationNumber,
      contactPersonName,
      contactPersonPosition,
      secondaryContact,
    } = requestData;

    const lowerCaseEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongo();
    console.log("MongoDB Connected");

    // Check if the user already exists based on email or contact
    let existingUser = await UserModel.findOne({
      $or: [{ email: lowerCaseEmail }, { contact }],
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          {
            message: "User is already verified. Please log in.",
          },
          { status: 201 }
        );
      } else {
        existingUser.name = name;
        existingUser.password = hashedPassword;
        existingUser.contact = contact;
        existingUser.address = address;
        existingUser.userRole = role;

        await existingUser.save();

        if (role === UserRole.SERVICE_PROVIDER) {
          await ServiceProviderModel.updateOne(
            { linkedUserId: existingUser._id },
            {
              $set: {
                email: lowerCaseEmail,
                password: hashedPassword,
                name,
                address,
                contact,
                profession,
                dob,
                gender,
                isVerified: false,
                joinedDate: new Date(),
              },
            }
          );
        } else if (role === UserRole.COMPANY) {
          await CompanyModel.updateOne(
            { linkedUserId: existingUser._id },
            {
              $set: {
                email: lowerCaseEmail,
                password: hashedPassword,
                name,
                address,
                contact,
                registrationNumber,
                contactPersonName,
                contactPersonPosition,
                secondaryContact,
                isVerified: false,
                joinedDate: new Date(),
              },
            }
          );
        }

        await sendEmail({
          recipientEmail: existingUser.email,
          emailType: "VERIFY",
          userId: existingUser._id,
          name: existingUser.name,
        });

        return NextResponse.json(
          {
            message:
              "User exists but not verified. Verification link has been sent again.",
          },
          { status: 201 }
        );
      }
    }

    // If the user does not exist, create a new user
    const newUser = new UserModel({
      name,
      email: lowerCaseEmail,
      password: hashedPassword,
      contact,
      address,
      userRole: role,
      profileStatus: false,
      joinedDate: new Date(),
    });

    const savedUser = await newUser.save();

    // Depending on the role, register as ServiceProvider or Company
    if (role === UserRole.SERVICE_PROVIDER) {
      const serviceProvider = new ServiceProviderModel({
        linkedUserId: savedUser._id,
        email: lowerCaseEmail,
        password: hashedPassword,
        name,
        address,
        contact,
        profession,
        dob,
        gender,
        isVerified: false,
        profileStatus: false,
        joinedDate: new Date(),
      });
      await serviceProvider.save();
    } else if (role === UserRole.COMPANY) {
      const company = new CompanyModel({
        linkedUserId: savedUser._id,
        email: lowerCaseEmail,
        password: hashedPassword,
        name,
        address,
        contact,
        registrationNumber,
        contactPersonName,
        contactPersonPosition,
        secondaryContact,
        isVerified: false,
        profileStatus: false,
        joinedDate: new Date(),
      });
      await company.save();
    }

    await sendEmail({
      recipientEmail: savedUser.email,
      emailType: "VERIFY",
      userId: savedUser._id,
      name: savedUser.name,
    });

    return NextResponse.json(
      {
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
