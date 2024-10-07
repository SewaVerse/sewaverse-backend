import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/connectMongo";
import bcrypt from "bcryptjs";
import { currentUser } from "@/lib/auth";
import UserModel from "@/models/Users/User";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const POST = async (request: NextRequest) => {
  console.log("Running POST: Change Password");
  const user = await currentUser();

  if (!user || !user.id) {
    return NextResponse.json(
      { message: "No authenticated user found" },
      { status: 404 }
    );
  }
  try {
    const data = await request.json();
    const { oldPassword, newPassword } = data;

    await connectMongo();
    console.log("MongoDB Connected");

    const existingUser = await UserModel.findOne({ _id: user?.id });
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
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to change password", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
};
