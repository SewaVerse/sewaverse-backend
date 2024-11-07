import connectMongo from "@/lib/connectMongo";
import { sendEmail } from "@/lib/nodemailer";
import CompanyModel from "@/models/Users/Company";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import UserModel from "@/models/Users/User";
import UserProfile from "@/models/Users/UserProfile";
import { UserRole } from "@/lib/constants";
import {
  userSchema,
  serviceProviderSchema,
  companySchema,
} from "@/schemas/zod";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST Request: Signup");

  const requestData = await request.json();
  let validationResult;

  // Zod schema validation based on role
  if (requestData.role === UserRole.SERVICE_PROVIDER) {
    validationResult = serviceProviderSchema.safeParse(requestData);
  } else if (requestData.role === UserRole.COMPANY) {
    validationResult = companySchema.safeParse(requestData);
  } else {
    validationResult = userSchema.safeParse(requestData);
  }

  // Return if validation fails
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
      serviceCategory,
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

    // Check if user already exists in UserModel
    let existingUser = await UserModel.findOne({ email: lowerCaseEmail });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          {
            message: "User already exist",
          },
          { status: 201 }
        );
      } else {
        // Update existing user's information if not verified
        existingUser.name = name;
        existingUser.password = hashedPassword;
        existingUser.contact = contact;
        existingUser.address = address;
        existingUser.userRole = role;

        await existingUser.save();

        // Based on role, update the respective model
        if (role === UserRole.SERVICE_PROVIDER) {
          await ServiceProviderModel.updateOne(
            { linkedUserId: existingUser._id },
            {
              $set: {
                email: lowerCaseEmail,
                name,
                address,
                contact,
                dob,
                gender,
                serviceCategory,
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
        } else {
          await UserProfile.updateOne(
            { linkedUserId: existingUser._id },
            {
              $set: {
                email: lowerCaseEmail,
                name,
                contact,
                address,
                gender,
                dob,
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

    // Create a new user in UserModel
    const newUser = new UserModel({
      email: lowerCaseEmail,
      password: hashedPassword,
      userRole: role,
      isVerified: false,
      isProfileVerified: false,
      joinedDate: new Date(),
    });

    const savedUser = await newUser.save();

    // Add the user to the respective role-specific schema
    if (role === UserRole.SERVICE_PROVIDER) {
      const serviceProvider = new ServiceProviderModel({
        linkedUserId: savedUser._id,
        email: lowerCaseEmail,
        name,
        address,
        contact,
        dob,
        gender,
        serviceCategory,
        isVerified: false,
        isProfileVerified:false,
        joinedDate: new Date(),
      });
      await serviceProvider.save();
    } else if (role === UserRole.COMPANY) {
      const company = new CompanyModel({
        linkedUserId: savedUser._id,
        email: lowerCaseEmail,
        name,
        address,
        contact,
        registrationNumber,
        contactPersonName,
        contactPersonPosition,
        secondaryContact,
        isVerified: false,
        isProfileVerified:false,
        joinedDate: new Date(),
      });
      await company.save();
    } else if (role === UserRole.USER) {
      const userProfile = new UserProfile({
        linkedUserId: savedUser._id,
        email: lowerCaseEmail,
        name,
        contact,
        address,
        gender,
        dob,
        isVerified: false,
        joinedDate: new Date(),
      });
      await userProfile.save();
    }

    // Send verification email
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
