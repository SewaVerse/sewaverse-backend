import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import { UserRole } from "@/lib/constants";
import CompanyModel from "@/models/Users/Company";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import UserProfile from "@/models/Users/UserProfile";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Admin get users by role and status");

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
    const status = searchParams.get("status");

    if (!userRole) {
      return NextResponse.json(
        { success: false, message: "No role specified" },
        { status: 400 }
      );
    }

    const filter: any = {};
    if (status) {
      filter.isProfileVerified = status === "true" ? true : false;
    }

    let existingUser;
    if (userRole === UserRole.SERVICE_PROVIDER) {
      existingUser = await ServiceProviderModel.find(filter).sort({
        joinedDate: -1,
      });
    } else if (userRole === UserRole.COMPANY) {
      existingUser = await CompanyModel.find(filter).sort({ joinedDate: -1 });
    } else if (userRole === UserRole.USER) {
      existingUser = await UserProfile.find(filter).sort({ joinedDate: -1 });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid user role" },
        { status: 400 }
      );
    }

    if (existingUser.length === 0) {
      return NextResponse.json(
        { success: false, message: "No users found for this role and status" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, users: existingUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
