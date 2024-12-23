import { NextResponse } from "next/server";

import { getServiceById } from "@/app/data-access/service";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

export const GET = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    console.error("Running GET request: Get service byid");
    const id = (await params).slug;

    const existingService = await getServiceById(id);

    if (!existingService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Service found", data: existingService },
      { status: 200 }
    );
  }
);
