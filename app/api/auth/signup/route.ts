import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import ServiceProviderModel from "@/models/ServiceProvider";
import CompanyModel from "@/models/Company";
import { userSchema, serviceProviderSchema, companySchema } from "@/schema/zod";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/connectMongo";
import { UserRole } from "@/types/roles";
import { sendEmail } from "@/lib/nodemailer";

export const POST = async (request: NextRequest) => {
  console.log("Running POST Request: Signup");

  const requestData = await request.json();
  let validationResult;

  // Validation based on role
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

    // Convert email to lowercase
    const lowerCaseEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongo();
    console.log("MongoDB Connected");

    // Check if the user already exists based on email or contact
    let existingUser = await UserModel.findOne({
      $or: [{ email: lowerCaseEmail }, { contact }],
    });

    if (existingUser) {
      // If the user exists and is verified, prompt them to log in
      if (existingUser.isVerified) {
        return new NextResponse(
          JSON.stringify({
            message: "User is already verified. Please log in.",
          }),
          { status: 400 }
        );
      } else {
        // If the user exists but is not verified, update the user data and resend the verification code
        existingUser.name = name;
        existingUser.password = hashedPassword;
        existingUser.contact = contact;
        existingUser.address = address;
        existingUser.role = role;

        await existingUser.save();

        if (role === UserRole.SERVICE_PROVIDER) {
          await ServiceProviderModel.updateOne(
            { linkedUserId: existingUser._id },
            {
              $set: {
                email: lowerCaseEmail,
                password: hashedPassword,
                name: name,
                address: address,
                role,
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
                name: name,
                address: address,
                role,
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
          email: existingUser.email,
          emailType: "VERIFY",
          userId: existingUser._id,
          name: existingUser.name,
        });

        return new NextResponse(
          JSON.stringify({
            message:
              "User exists but not verified. Verification code sent again.",
            userId: existingUser._id,
          }),
          { status: 200 }
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
      role,
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
        role,
        contact,
        profession,
        dob,
        gender,
        isVerified: false,
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
        role,
        contact,
        registrationNumber,
        contactPersonName,
        contactPersonPosition,
        secondaryContact,
        isVerified: false,
        joinedDate: new Date(),
      });
      await company.save();
    }

    await sendEmail({
      email: savedUser.email,
      emailType: "VERIFY",
      userId: savedUser._id,
      name: savedUser.name,
    });

    return new NextResponse(
      JSON.stringify({
        message: "User registered successfully. Please verify your email",
        userId: savedUser._id,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error Occurred", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error Occurred",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
