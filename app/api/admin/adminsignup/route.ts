import { NextResponse, NextRequest } from "next/server";
import UserModel from "@/models/Users/User";
import bcrypt from "bcryptjs";
import connectMongo from "@/lib/connectMongo";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Add Admin");

  try {
    const { name, email, password, userRole } = await request.json();
    const lowerCaseEmail = email.toLowerCase();

    if (userRole !== "ADMIN") {
      return NextResponse.json({ error: "Invalid user role" }, { status: 400 });
    }

    await connectMongo();
    const existingUser = await UserModel.findOne({ email: lowerCaseEmail });

    if (existingUser) {
      if (existingUser.isVerified) {
        console.log("User Already Exists");
        return NextResponse.json(
          { message: "User Already Exists" },
          { status: 409 }
        );
      } else {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          await UserModel.updateOne(
            { email: lowerCaseEmail },
            { $set: { password: hashedPassword } }
          );

          return NextResponse.json(
            { message: "Signup Successful!" },
            { status: 201 }
          );
        } catch (error) {
          return NextResponse.json(
            { error: "User update failed" },
            { status: 500 }
          );
        }
      }
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
          name: name,
          email: lowerCaseEmail,
          password: hashedPassword,
          userRole: "ADMIN",
          joinedDate: Date.now(),
        });

        await newUser.save();

        return NextResponse.json(
          { message: "Signup Successful!" },
          { status: 201 }
        );
      } catch (error: any) {
        return NextResponse.json(
          { error: "User creation failed" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
