import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/Users/User";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import CompanyModel from "@/models/Users/Company";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request: Get data by role");

  const role = await currentRole();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // let role = "USER";

  try {
    await connectMongo();

    if (role === "USER") {
      const user = await UserModel.findOne({ id });
      return NextResponse.json(user, { status: 200 });
    }

    if (role === "SERVICE_PROVIDER") {
      const serviceProvider = await ServiceProviderModel.findOne({
        linkedUserId: id,
      });
      return NextResponse.json(serviceProvider, { status: 200 });
    }

    if (role === "COMPANY") {
      const company = await CompanyModel.findOne({ linkedUserId: id });
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
