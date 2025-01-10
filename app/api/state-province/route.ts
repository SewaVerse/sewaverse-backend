import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import paginate from "@/app/utils/pagination";
import { getPaginationParams } from "@/app/utils/paginationHelper";

export const GET = asyncHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const countryId = searchParams.get("countryId");

  const { page, limit } = getPaginationParams(searchParams);
  const where: Prisma.StateProvinceWhereInput = {};

  if (countryId) {
    where.countryId = countryId;
  }

  // Use the paginate function to fetch paginated state provinces
  const paginationData = await paginate({
    model: "stateProvince",
    page,
    limit,
    where: {},
  });

  return NextResponse.json({
    success: true,
    message: "State Provinces fetched successfully",
    ...paginationData,
  });
});
