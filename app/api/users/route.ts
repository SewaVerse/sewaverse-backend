import { NextRequest, NextResponse } from "next/server";
import { currentUser, currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/Users/User";
import ServiceProviderModel from "@/models//Users/ServiceProvider";
import CompanyModel from "@/models/Users/Company";

export const GET = async () => {
  try {
    await connectMongo();

    const role = await currentRole();
    const user = await currentUser();

    if (!user || !role) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (role === "USER") {
      const User = await UserModel.findById(user.id);
      return NextResponse.json(User, { status: 200 });
    }

    if (role === "SERVICE_PROVIDER") {
      const serviceProvider = await ServiceProviderModel.findOne({
        linkedUserId: user.id,
      });
      return NextResponse.json(serviceProvider, { status: 200 });
    }

    if (role === "COMPANY") {
      const company = await CompanyModel.findOne({ linkedUserId: user.id });
      return NextResponse.json(company, { status: 200 });
    }

    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};


export const POST = async(request:NextRequest) =>{
  console.log("Running POST Request: Update User")
}