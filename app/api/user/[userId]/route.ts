import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User";
import mongoose from "mongoose";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  console.log("Running GET Request: Get User By ID");

  const { userId } = params;
  // console.log(userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      { message: "Invalid userId parameter" },
      { status: 400 }
    );
  }

  try {
    await connectMongo();
    console.log("MongoDB Connected");

    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", user }, { status: 200 });
  } catch (error) {
    console.log("Something Went Wrong", error);
    return NextResponse.json({
      message: "Something went wrong",
      error,
      status: 500,
    });
  }
};
export const PUT = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  console.log("Running PUT Request: Update User By ID");

  const { userId } = params;
  console.log("User ID:", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      { message: "Invalid userId parameter" },
      { status: 400 }
    );
  }

  try {
    await connectMongo();
    console.log("MongoDB Connected");

    const rawData = await request.text(); // Get raw request body
    console.log("Raw Data:", rawData);

    const updatedData = JSON.parse(rawData); // Parse JSON manually
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).exec();

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.log("Something Went Wrong", error);
    return NextResponse.json({
      message: "Something went wrong",
      error,
      status: 500,
    });
  }
};
