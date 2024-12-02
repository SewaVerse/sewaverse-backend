import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import CompanyModel from "@/models/Users/Company";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import UserProfile from "@/models/Users/UserProfile";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

    if (role === "ADMIN") {
      const models = [
        { model: UserProfile, notFoundMessage: "User not found" },
        {
          model: ServiceProviderModel,
          notFoundMessage: "Service provider not found",
        },
        { model: CompanyModel, notFoundMessage: "Company not found" },
      ];

      for (const { model, notFoundMessage } of models) {
        const result = await model.findOne({ linkedUserId: _id });
        if (result) {
          return NextResponse.json(result, { status: 200 });
        }
      }

      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
