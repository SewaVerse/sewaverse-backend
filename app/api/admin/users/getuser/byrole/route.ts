import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { UserRole } from "@/lib/constants";
import CompanyModel from "@/models/Users/Company";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import UserProfile from "@/models/Users/UserProfile";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Admin get users by role");

  try {
    const role = await currentRole();
    await connectMongo();

    if (role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userRole = searchParams.get("role");

    if (!userRole) {
      return NextResponse.json(
        { success: false, message: "No role" },
        { status: 200 }
      );
    }

    if (userRole === UserRole.SERVICE_PROVIDER) {
      const existingUser = await ServiceProviderModel.find().sort({
        joinedDate: -1,
      });

      return NextResponse.json(
        { success: true, existingUser },
        { status: 200 }
      );
    } else if (userRole === UserRole.COMPANY) {
      const existingUser = await CompanyModel.find().sort({ joinedDate: -1 });

      return NextResponse.json(
        { success: true, existingUser },
        { status: 200 }
      );
    } else if (userRole === UserRole.USER) {
      const existingUser = await UserProfile.find().sort({ joinedDate: -1 });
      return NextResponse.json(
        { success: true, existingUser },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "No user found with role" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching users by role:", error.message);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 400 }
    );
  }
};
