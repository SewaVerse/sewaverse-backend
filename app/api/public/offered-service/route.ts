import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import paginate from "@/app/utils/pagination";
import { getPaginationParams } from "@/app/utils/paginationHelper";

export const GET = asyncHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const { page, limit } = getPaginationParams(searchParams);

  const where: Prisma.OfferedServiceWhereInput = {
    published: true,
    adminVerified: true,
  };

  const include: Prisma.OfferedServiceInclude = {
    service: true,
    serviceProvider: true,
  };

  const services = await paginate({
    model: "offeredService",
    where,
    include,
    page,
    limit,
  });

  return NextResponse.json(
    {
      success: true,
      message: "Offered services fetched successfully",
      data: services,
    },
    { status: 200 }
  );
});
