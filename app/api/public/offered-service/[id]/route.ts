import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getOfferedServiceById } from "@/app/data-access/offeredService";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

export const GET = asyncHandler(async (request: NextRequest) => {
  console.warn("Running GET Request: Offered Service By ID");

  const id = request.nextUrl.pathname.split("/").pop();
  console.warn("Extracted ID:", id);

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "OfferedService ID is required",
      },
      { status: 400 }
    );
  }

  // Define the `include` object to fetch related data
  const include: Prisma.OfferedServiceInclude = {
    service: true,
    serviceProvider: true,
    images: {
      include: {
        image: true,
      },
    },
    bookings: true,
    ratings: true,
    reviews: true,
  };

  // Fetch the OfferedService by ID with the `include` object
  const offeredService = await getOfferedServiceById(id, include);

  if (!offeredService) {
    return NextResponse.json(
      {
        success: false,
        message: "OfferedService not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "OfferedService fetched successfully",
      data: offeredService, 
    },
    { status: 200 }
  );
});
