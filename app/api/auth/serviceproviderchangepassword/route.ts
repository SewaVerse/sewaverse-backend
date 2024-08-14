import { NextResponse, NextRequest } from "next/server";
import { hashPassword } from "@/lib/hashpassword";
import connectMongo from "@/lib/connectMongo";
import bcrypt from "bcrypt";
import { getUserById } from "@/data/user";

export const POST = async (request: NextRequest) => {
  console.log("Running POST: Change Password");
  try {
    const data = await request.json();
    const { userId, oldPassword, newPassword } = data;

    await connectMongo();
    console.log("MongoDB Connected");

    const existingUser = await getUserById(userId);
    if (!existingUser) return NextResponse.json({ message: "No user found" });

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordMatch)
      return NextResponse.json({ message: "Old password does not match" });

    const newHashedPassword = await hashPassword(newPassword);
    if (!newHashedPassword)
      return NextResponse.json({ message: "Error hashing new password" });

    existingUser.password = newHashedPassword;
    await existingUser.save();

    return NextResponse.json({ message: "Password has been changed" });
  } catch (error: any) {
    console.error("Something went wrong", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
};
