import { NextResponse, NextRequest } from "next/server";
import { hashPassword } from "@/lib/hashpassword";
import connectMongo from "@/lib/connectMongo";
import bcrypt from "bcryptjs";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { auth } from "@/auth";
import UserModel from "@/models/Users/User";

export const POST = async (request: NextRequest) => {
  console.log("Running POST: Change Password");
  const user = await currentUser();

  try {
    const data = await request.json();
    const { oldPassword, newPassword } = data;

    await connectMongo();
    console.log("MongoDB Connected");

    const existingUser = await UserModel.findOne({ _id: user?._id });
    if (!existingUser)
      return NextResponse.json({ message: "No user found" }, { status: 404 });

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordMatch)
      return NextResponse.json(
        { message: "Old password does not match" },
        { status: 401 }
      );

    const newHashedPassword = await hashPassword(newPassword);
    existingUser.password = newHashedPassword;
    await existingUser.save();

    return NextResponse.json(
      { message: "Password changed successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Something went wrong", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
};
