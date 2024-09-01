// import { NextRequest, NextResponse } from "next/server";
// import ServiceModel from "@/models/Service";
// import connectMongo from "@/lib/connectMongo";
// //import { getServerSession } from "next-auth/next";
// //import { authOptions } from "@/authOptions";

// export const POST = async (request: NextRequest) => {
//   console.log("POST Request Running: Add Service");

//   try {
//     await connectMongo();
//     console.log("MongoDB Connected");

//     //const session = await getServerSession(authOptions);

//     if (!session) {
//       console.log("unauthorized");
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const userId = session.user?.id;
//     if (!userId) {
//       return NextResponse.json(
//         { message: "User Id not found in session" },
//         { status: 400 }
//       );
//     }

//     const data = await request.json();

//     const newService = new ServiceModel({ ...data, userId: userId });

//     const savedService = await newService.save();

//     //console.log("Service saved:", savedService);

//     return NextResponse.json(
//       { message: "Saved Data", data: savedService },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.log("Something went wrong", error);
//     return NextResponse.json(
//       { message: "Something went wrong", error: error.message },
//       { status: 500 }
//     );
//   }
// };

// export const GET = async () => {
//   console.log("Running GET Request: Get Service Details");
//   try {
//     await connectMongo();
//     console.log("MongoDB Connected");

//     const session = await getServerSession(authOptions);

//     if (!session) {
//       console.log("unauthorized");
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const userId = session.user?.id;
//     if (!userId) {
//       return NextResponse.json(
//         { message: "User Id not found in session" },
//         { status: 400 }
//       );
//     }

//     const userServices = await ServiceModel.find({ userId });
//     if (userServices.length === 0) {
//       return NextResponse.json({ message: "No services" }, { status: 200 });
//     }

//     return NextResponse.json(
//       { message: "User Services", userServices },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.log("Error getting service details", error);
//     return NextResponse.json(
//       { message: "Error getting service details" },
//       { status: 500 }
//     );
//   }
// };

import { currentRole, currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Services from "@/models/Services/Services";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Court");
  const user = await currentRole();
  const id = await currentUser();
  

  try {
    const Data = await request.json();
    await connectMongo();

    if (user === "SERVICE_PROVIDER" || user === "COMPANY") {

      const existingDoc = await Services.findOne({ _id: Data?._id });
      if (existingDoc) {
        await existingDoc.updateOne(Data);
        return NextResponse.json(
          { message: "Service Updated" },
          { status: 201 }
        );
      } else {
        const newDoc = new Services({ ...Data });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Service Added" },
          { status: 201 }
        );
      }
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};

export const GET = async () => {
  console.log("Running GET request:User Get all Services");
  const user = await currentRole();

  try {
    await connectMongo();
    if (user === "USER") {
      const docs = await Services.find().sort({
        createdDate: -1,
      });
      return NextResponse.json(docs, { status: 201 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
