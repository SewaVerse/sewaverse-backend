import { NextRequest, NextResponse } from "next/server";
import ServiceModel from "@/models/Service";
import connectMongo from "@/lib/connectMongo";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";

export const POST = async (request: NextRequest) => {
  console.log("POST Request Running: Add Service");

  try {
    await connectMongo();
    console.log("MongoDB Connected");

    const session = await getServerSession(authOptions);

    if (!session) {
      console.log("unauthorized");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user?.id;
    if (!userId) {
      return NextResponse.json(
        { message: "User Id not found in session" },
        { status: 400 }
      );
    }

    const data = await request.json();

    const newService = new ServiceModel({ ...data, userId: userId });

    const savedService = await newService.save();

    //console.log("Service saved:", savedService);

    return NextResponse.json(
      { message: "Saved Data", data: savedService },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};


export const GET = async () => {
  console.log("Running GET Request: Get Service Details");
  try {
    await connectMongo();
    console.log("MongoDB Connected");

    const session = await getServerSession(authOptions);

    if (!session) {
      console.log("unauthorized");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user?.id;
    if (!userId) {
      return NextResponse.json(
        { message: "User Id not found in session" },
        { status: 400 }
      );
    }

    const userServices = await ServiceModel.find({ userId });
    if (userServices.length === 0) {
      return NextResponse.json({ message: "No services" }, { status: 200 });
    }

    return NextResponse.json(
      { message: "User Services", userServices },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error getting service details", error);
    return NextResponse.json(
      { message: "Error getting service details" },
      { status: 500 }
    );
  }
};