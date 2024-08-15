import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/connectMongo";
import ServiceModel from "@/models/Service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { service_id: string } }
) => {
  console.log("Running PUT Request: Update Service");

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
    const serviceId = params.service_id;

    console.log(serviceId);

    if (!serviceId) {
      return NextResponse.json(
        { message: "No serviceId found in URL" },
        { status: 400 }
      );
    }
    const {
      serviceName,
      description,
      serviceCategory,
      pricingType,
      price,
      location,
      image,
    } = await request.json();

    const updatedService = await ServiceModel.findOneAndUpdate(
      { _id: serviceId, userId: session.user?.id },
      {
        serviceName,
        description,
        serviceCategory,
        pricingType,
        price,
        location,
        image,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!updatedService) {
      return NextResponse.json(
        { message: "Service not found or not authorized to update" },
        { status: 404 }
      );
    }

    console.log("Updated Service:", updatedService);
    return NextResponse.json(
      { message: "Service updated successfully", updatedService },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error updating Service", error);
    return NextResponse.json({ message: "Error updating service" });
  }
};
