import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/User";
import mongoose from "mongoose";
import ServiceProviderModel from "@/models/ServiceProvider";
import CompanyModel from "@/models/Company";

export const GET = async (request: NextRequest) => {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log(userId);

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "_id is required" }), {
        status: 400,
      });
    }

    // Fetch service provider details using the userId
    const serviceProviderDetails = await ServiceProviderModel.findById(userId);
    if (serviceProviderDetails) {
      return NextResponse.json(
        { message: "Service Provider found", serviceProviderDetails },
        { status: 200 }
      );
    }

    // Fetch company details using the userId
    const companyDetails = await CompanyModel.findById(userId);
    if (companyDetails) {
      return NextResponse.json(
        { message: "Company found", companyDetails },
        { status: 200 }
      );
    }

    // Fetch user details if not found as service provider or company
    const userDetails = await UserModel.findById(userId);
    if (userDetails) {
      return NextResponse.json(
        { message: "User found", userDetails },
        { status: 200 }
      );
    }

    // If no details are found
    return new NextResponse(JSON.stringify({ message: "No user found" }), {
      status: 404,
    });
  } catch (error) {
    console.error("Error fetching details:", error);
    return new NextResponse(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};
