import { NextResponse } from "next/server";

import { deleteFileById } from "@/app/data-access/file";
import { deleteServiceById, getServiceById } from "@/app/data-access/service";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";

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

export const DELETE = roleAsyncHandler(
  "ADMIN",
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    const id = (await params).slug;

    const service = await getServiceById(id);
    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    if (service.imageId) await deleteFileById(service.imageId);

    await deleteServiceById(id);

    return NextResponse.json(
      {
        success: true,
        message: "Service deleted successfully",
      },
      { status: 200 }
    );
  }
);
