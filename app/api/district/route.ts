import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import paginate from "@/app/utils/pagination";
import { getPaginationParams } from "@/app/utils/paramHelper";

export const GET = asyncHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const stateProvinceId = searchParams.get("stateProvinceId");

  const { page, limit } = getPaginationParams(searchParams);

  const where: Prisma.DistrictWhereInput = {};

  if (stateProvinceId) {
    where.stateProvinceId = stateProvinceId;
  }

  const paginationData = await paginate({
    model: "district",
    page,
    limit,
    where: {},
  });

  return NextResponse.json({
    success: true,
    message: "Districts fetched successfully",
    ...paginationData,
  });
});
