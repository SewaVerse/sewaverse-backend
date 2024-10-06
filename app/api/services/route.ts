import { getUserById } from "@/data/user";
import { currentRole, currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Services from "@/models/Services/Services";
import UserModel from "@/models/Users/User";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Add/Update Service");

  const user = await currentUser();
  const role = await currentRole();
  //const userId = "66fd0611c7b14cc9f4633233";

  if (!user || !role) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const Data = await request.json();
    await connectMongo();

    if (role === "SERVICE_PROVIDER" || role === "COMPANY" || role === "ADMIN") {
      const existingDoc = await Services.findOne({ _id: Data?._id });
      const existingUser = await UserModel.findOne({ _id: user.id });

      //console.log(existingUser.profileStatus);

      if (existingDoc) {
        await existingDoc.updateOne({
          $set: {
            ...Data,
            updatedDate: Date.now(),
          },
        });
        return NextResponse.json(
          { message: "Service Updated" },
          { status: 201 }
        );
      } else if (role === "ADMIN" || existingUser.profileStatus) {
        const newDoc = new Services({ ...Data, linkedUserId: user.id });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Service Added" },
          { status: 201 }
        );
      } else
        return NextResponse.json(
          { message: "Profile is not verified." },
          { status: 403 }
        );
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  console.log("Running GET request: Get all Services");

  const user = await currentUser();
  // console.log("Get request", user?.id);
  // const role = user?.role;
  // console.log(role);
  const role = await currentRole();

  if (!user || !role) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongo();

    let docs;
    if (role === "USER" || role === "ADMIN") {
      docs = await Services.find().sort({ createdDate: -1 });
    } else if (role === "SERVICE_PROVIDER") {
      docs = await Services.find({ linkedUserId: user.id });
    } else if (role === "COMPANY") {
      docs = await Services.find({ linkedUserId: user.id });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(docs, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching services" },
      { status: 500 }
    );
  }
};
