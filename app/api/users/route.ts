import { currentUser, currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import ServiceProviderModel from "@/models//Users/ServiceProvider";
import CompanyModel from "@/models/Users/Company";
import UserModel from "@/models/Users/User";
import UserProfile from "@/models/Users/UserProfile";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST Request: Update User");

  const user = await currentUser();
  const role = await currentRole();

  if (!user || !role) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    await connectMongo();

    const existingUser = await UserModel.findOne({ _id: user.id });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (role === "SERVICE_PROVIDER") {
      const existingServiceProvider = await ServiceProviderModel.findOne({
        linkedUserId: user.id,
      });

      if (existingServiceProvider) {
        await existingServiceProvider.updateOne({
          linkedUserId: user.id,
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
        linkedUserId: user.id,
      });
      if (existingUserProfile) {
        await existingUserProfile.updateOne({
          linkedUserId: user.id,
          $set: { ...data },
        });

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
        linkedUserId: user.id,
      });
      if (existingCompany) {
        await existingCompany.updateOne({
          linkedUserId: user.id,
          $set: { ...data },
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
    console.error("Something went wrong", error);
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
