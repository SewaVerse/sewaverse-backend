import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import CompanyModel from "@/models/Users/Company";
import ServiceProviderModel from "@/models/Users/ServiceProvider";
import UserModel from "@/models/Users/User";
import { UserRole } from "@/schemas/index";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const role = await currentRole();
  //const role = "ADMIN";
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  //const id = "66fd1649d2e0c5d7a3f43657";
  try {
    await connectMongo();

    if (role === "ADMIN") {
      const existingUser = await UserModel.findOne({
        _id: id,
      });

      if (!existingUser) {
        return NextResponse.json({ message: "User does not exist" });
      }
      //   console.log(existingUser);

      existingUser.profileStatus = true;
      await existingUser.save();

      if (existingUser.userRole === UserRole.SERVICE_PROVIDER) {
        await ServiceProviderModel.updateOne(
          { linkedUserId: id },
          { $set: { profileStatus: true } }
        );
      } else if (existingUser.userRole === UserRole.COMPANY) {
        await CompanyModel.updateOne(
          { linkedUserId: id },
          { $set: { profileStatus: true } }
        );
      }

      return NextResponse.json(
        { message: "User details verified successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log("Something went wrong:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
