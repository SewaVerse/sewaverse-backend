import { NextResponse } from "next/server";

import { verifyServiceProvider } from "@/app/data-access/admin";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

export const POST = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    console.error("Running POST request: Verify service provider by ADMIN");

    const slug = (await params).slug;

    await verifyServiceProvider(slug);

    return NextResponse.json(
      { success: true, message: "Service provider verified" },
      { status: 201 }
    );
  }
);
