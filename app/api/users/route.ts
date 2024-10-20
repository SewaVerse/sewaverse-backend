import { NextRequest, NextResponse } from "next/server";
import { currentUser, currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import ServiceProviderModel from "@/models//Users/ServiceProvider";
import CompanyModel from "@/models/Users/Company";
import UserProfile from "@/models/Users/UserProfile";
import UserModel from "@/models/Users/User";

export const POST = async (request: NextRequest) => {
  console.log("Running POST Request: Update User");

  const user = await currentUser();
  const role = await currentRole();

  console.log(user, role);

  if (!user || !role) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    console.log(data.id);
    await connectMongo();

    const existingUser = await UserModel.findOne({ _id: data.id });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (role === "SERVICE_PROVIDER") {
      const existingServiceProvider = await ServiceProviderModel.findOne({
        linkedUserId: data.id,
      });
      if (existingServiceProvider) {
        await existingServiceProvider.updateOne({
          $set: {
            ...data,
          },
        });
        return NextResponse.json(
          { message: "Service Provider Updated" },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "Service Provider not found" },
          { status: 404 }
        );
      }
    } else if (role === "USER") {
      const existingUserProfile = await UserProfile.findOne({
        linkedUserId: data.id,
      });
      if (existingUserProfile) {
        await existingUserProfile.updateOne(
          { linkedUserId: data._id },
          { $set: data }
        );

        return NextResponse.json(
          { message: "User Profile Updated" },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "User Profile not found" },
          { status: 404 }
        );
      }
    } else if (role === "COMPANY") {
      const existingCompany = await CompanyModel.findOne({
        linkedUserId: data.id,
      });
      if (existingCompany) {
        await existingCompany.updateOne({
          $set: {
            ...data,
          },
        });
        return NextResponse.json(
          { message: "Company Updated" },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "Company not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  } catch (error: any) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
};

// export const GET = async () => {
//   console.log("Running GET Request: Get All User Details");

//   try {
//     await connectMongo();

//     const role = await currentRole();
//     const user = await currentUser();

//     if (!user || !role) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     if (role === "USER") {
//       const allUsers = await UserProfile.find().sort({ joinedDate: 1 });
//       return NextResponse.json(allUsers, { status: 200 });
//     }

//     if (role === "SERVICE_PROVIDER") {
//       const allServiceProviders = await ServiceProviderModel.find()
//       .sort({ joinedDate: 1 });
//       return NextResponse.json(allServiceProviders, { status: 200 });
//     }

//     if (role === "COMPANY") {
//       const allCompanies = await CompanyModel.find()
//       .sort({ joinedDate: 1 });
//       return NextResponse.json(allCompanies, { status: 200 });
//     }

//     return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
//   } catch (error) {
//     console.error("Error fetching users info:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };
