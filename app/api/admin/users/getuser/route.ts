import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/Users/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("Running GET request: Admin get all users ");
  const role = await currentRole();

  try {
    await connectMongo();
    if (role === "ADMIN") {
      const users = await UserModel.find().sort({ joinedDate: -1 });
      return NextResponse.json({ success: true, users }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 400 }
    );
  }
};
