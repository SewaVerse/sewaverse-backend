import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/connectMongo";
import ServiceModel from "@/models/Services/Service";

export const dynamic = "force-dynamic";

export const POST = async (
  request: NextRequest,
  { params }: { params: { service_id: string } }
) => {
  console.log("Running POST Request: Toggle Service Status");

  try {
    await connectMongo();
    console.log("MongoDB Connected");

    const serviceId = params.service_id;
    if (!serviceId) {
      return NextResponse.json(
        { message: "No Service ID in URL" },
        { status: 400 }
      );
    }
    const { isActive } = await request.json();
    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { message: "Invalid isActive value" },
        { status: 400 }
      );
    }

    const updatedService = await ServiceModel.findByIdAndUpdate(
      serviceId,
      { isActive },
      { new: true }
    );

    if (!updatedService) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Service status updated", updatedService },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Invalid request:", error);
    return new NextResponse(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
};
