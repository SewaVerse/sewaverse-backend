import { currentRole, currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import CompanyModel from "@/models/Users/Company";
import { NextRequest, NextResponse } from "next/server";
import UserProfile from "@/models/Users/UserProfile";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get data by role");

  try {
    const role = await currentRole();

    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (!role) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!_id) {
      return NextResponse.json(
        { message: "Missing ID parameter" },
        { status: 400 }
      );
    }

    await connectMongo();

    if (role === "USER") {
      const existingUser = await UserProfile.findOne({ linkedUserId: _id });
      if (!existingUser) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(existingUser, { status: 200 });
    }

    if (role === "SERVICE_PROVIDER") {
      const serviceProvider = await ServiceProviderModel.findOne({
        linkedUserId: _id,
      });
      if (!serviceProvider) {
        return NextResponse.json(
          { message: "Service provider not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(serviceProvider, { status: 200 });
    }

    if (role === "COMPANY") {
      const company = await CompanyModel.findOne({ linkedUserId: _id });
      if (!company) {
        return NextResponse.json(
          { message: "Company not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(company, { status: 200 });
    }

    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
};
