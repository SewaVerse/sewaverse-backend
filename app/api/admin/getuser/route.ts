import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/Users/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  const role = await currentRole();

  try {
    await connectMongo();
    if (role === "ADMIN") {
      const users = await UserModel.find().sort({ joinedDate: -1 });
      return NextResponse.json(users, { status: 200 });
    }

    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  } catch (error: any) {
    console.log("Something went wrong");
    return NextResponse.json(
      { message: "Soemthing went wrong" },
      { status: 400 }
    );
  }
};
