import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import paginate from "@/app/utils/pagination";
import { getPaginationParams } from "@/app/utils/paginationHelper";

export const GET = asyncHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const districtId = searchParams.get("districtId");

  const { page, limit } = getPaginationParams(searchParams);

  const where: Prisma.MunicipalityWhereInput = {};

  if (districtId) {
    where.districtId = districtId;
  }

  const paginationData = await paginate({
    model: "municipality",
    page,
    limit,
    where: {},
  });

  return NextResponse.json({
    success: true,
    message: "Municipalities fetched successfully",
    ...paginationData,
  });
});
