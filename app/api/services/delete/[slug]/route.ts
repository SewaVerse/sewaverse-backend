import { deleteFileById } from "@/app/data-access/file";
import { deleteServiceById, getServiceById } from "@/app/data-access/service";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { NextResponse } from "next/server";

export const DELETE = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    console.log("Running DELETE request: Delete Service");
    const id = (await params).slug;

    console.log(id);

    const service = await getServiceById(id);
    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    const deleted = await deleteServiceById(id);
    await deleteFileById(service.imageId || "");

    return NextResponse.json(
      {
        success: true,
        message: "Service deleted successfully",
        data: deleted,
      },
      { status: 200 }
    );
  }
);