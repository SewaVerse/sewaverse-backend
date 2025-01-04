import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import paginate from "@/app/utils/pagination";
import { getPaginationParams } from "@/app/utils/paginationHelper";

export const GET = asyncHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const { page, limit } = getPaginationParams(searchParams);

  const serviceWhere: Prisma.ServiceWhereInput = {
    isActive: true,
  };

  const include: Prisma.ServiceInclude = {
    file: true,
  };

  const services = await paginate({
    model: "service",
    where: serviceWhere,
    include,
    page,
    limit,
  });

  return NextResponse.json(
    { success: true, message: "Services fetched successfully", data: services },
    { status: 200 }
  );
});
