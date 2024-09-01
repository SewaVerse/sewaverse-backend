import { currentRole, currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/Users/User";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import CompanyModel from "@/models/Users/Company";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  console.log("Running PUT request: Update user data");

  const userRole = await currentRole();

  const user = await currentUser();

  //   let userRole = "SERVICE_PROVIDER";
  //   let user = {
  //     _id: "66cdb7f25f907e9c7e6ab1b5",
  //   };
  try {
    await connectMongo();

    const requestData = await request.json();
    let updatedData;

    if (userRole === "USER") {
      updatedData = await UserModel.findByIdAndUpdate(user._id, requestData, {
        new: true,
      });
    }

    if (userRole === "SERVICE_PROVIDER") {
      updatedData = await ServiceProviderModel.findOneAndUpdate(
        { linkedUserId: user._id },
        requestData,
        { new: true }
      );
      console.log(updatedData);
    }

    if (userRole === "COMPANY") {
      updatedData = await CompanyModel.findOneAndUpdate(
        { linkedUserId: user._id },
        requestData,
        { new: true }
      );
    }

    if (updatedData) {
      return NextResponse.json(
        { message: "User data updated successfully" },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update user data" },
      { status: 400 }
    );
  }
};
