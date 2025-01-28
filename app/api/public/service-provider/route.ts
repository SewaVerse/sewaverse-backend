import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import paginate from "@/app/utils/pagination";
import { getPaginationParams } from "@/app/utils/paramHelper";

export const GET = asyncHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const { page, limit } = getPaginationParams(searchParams);

  const where: Prisma.ServiceProviderWhereInput = {
    isVerified: true,
    isAdminVerified: true,
  };

  const include: Prisma.ServiceProviderInclude = {
    offeredServices: true,
    addresses: true,
    profiles: true,
  };

  const serviceProviders = await paginate({
    model: "serviceProvider",
    where,
    include,
    page,
    limit,
  });

  return NextResponse.json(
    {
      success: true,
      message: "Service providers fetched successfully",
      data: serviceProviders,
    },
    { status: 200 }
  );
});
