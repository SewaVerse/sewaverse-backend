import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/connectMongo";
import Services from "@/models/Services/Services";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST Request: Toggle Service Status");

  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("serviceid");
    await connectMongo();

    const existingService = await Services.findOne({ _id });

    if (existingService) {
      try {
        existingService.isActive = !existingService.isActive;
        await existingService.save();
        return NextResponse.json(
          { message: "Service Status Toggled !" },
          {
            status: 201,
          }
        );
      } catch (error) {
        return NextResponse.json(
          { error: "Service update failed" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Item Not Found !" },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      {
        status: 400,
      }
    );
  }
};
