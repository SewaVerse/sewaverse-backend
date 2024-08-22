// import { NextRequest, NextResponse } from "next/server";
// import connectMongo from "@/lib/connectMongo";
// import UserModel from "@/models/User";
// import mongoose from "mongoose";
// import ServiceProviderModel from "@/models/ServiceProvider";
// import CompanyModel from "@/models/Company";

// export const GET = async (request: NextRequest) => {
//   try {
//     await connectMongo();

//     // Extract userId from the request path
//     const { pathname } = new URL(request.url);
//     const userId = pathname.split("/").pop(); // Extract the last segment as userId

//     if (!userId) {
//       return new NextResponse(JSON.stringify({ message: "_id is required" }), {
//         status: 400,
//       });
//     }

//     // Fetch service provider details using the userId
//     const serviceProviderDetails = await ServiceProviderModel.findById(userId);
//     if (serviceProviderDetails) {
//       return NextResponse.json(
//         { message: "Service Provider found", serviceProviderDetails },
//         { status: 200 }
//       );
//     }

//     // Fetch company details using the userId
//     const companyDetails = await CompanyModel.findById(userId);
//     if (companyDetails) {
//       return NextResponse.json(
//         { message: "Company found", companyDetails },
//         { status: 200 }
//       );
//     }

//     // Fetch user details if not found as service provider or company
//     const userDetails = await UserModel.findById(userId);
//     if (userDetails) {
//       return NextResponse.json(
//         { message: "User found", userDetails },
//         { status: 200 }
//       );
//     }

//     // If no details are found
//     return new NextResponse(JSON.stringify({ message: "No user found" }), {
//       status: 404,
//     });
//   } catch (error) {
//     console.error("Error fetching details:", error);
//     return new NextResponse(JSON.stringify({ message: "Server error" }), {
//       status: 500,
//     });
//   }
// };

// export const PUT = async (
//   request: NextRequest,
//   { params }: { params: { userId: string } }
// ) => {
//   console.log("Running PUT Request: Update User By ID");

//   const { userId } = params;
//   console.log("User ID:", userId);

//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return NextResponse.json(
//       { message: "Invalid userId parameter" },
//       { status: 400 }
//     );
//   }

//   try {
//     await connectMongo();
//     console.log("MongoDB Connected");

//     const rawData = await request.text();

//     const updatedData = JSON.parse(rawData);

//     const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "User updated successfully", user: updatedUser },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("Something Went Wrong", error);
//     return NextResponse.json({
//       message: "Something went wrong",
//       error,
//       status: 500,
//     });
//   }
// };
