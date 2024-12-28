import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import paginate from "@/app/utils/pagination";
import { getPaginationParams } from "@/app/utils/paginationHelper";

export const GET = asyncHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const { page, limit } = getPaginationParams(searchParams);

  const paginationData = await paginate("country", {}, page, limit);

  return NextResponse.json({
    success: true,
    message: "Countries fetched successfully",
    ...paginationData,
  });
});
