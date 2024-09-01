import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/Users/User";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import CompanyModel from "@/models/Users/Company";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get data by role");

  const userRole = await currentRole();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id");

  // let userRole = "USER";

  try {
    await connectMongo();

    if (userRole === "USER") {
      const user = await UserModel.findById(_id);
      return NextResponse.json(user, { status: 200 });
    }

    if (userRole === "SERVICE_PROVIDER") {
      const serviceProvider = await ServiceProviderModel.findOne({
        linkedUserId: _id,
      });
      return NextResponse.json(serviceProvider, { status: 200 });
    }

    if (userRole === "COMPANY") {
      const company = await CompanyModel.findOne({ linkedUserId: _id });
      return NextResponse.json(company, { status: 200 });
    }

    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
