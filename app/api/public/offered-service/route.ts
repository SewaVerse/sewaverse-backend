import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { newPaginate } from "@/app/utils/pagination";
import { getPaginationParams, getParamValue } from "@/app/utils/paramHelper";

export const GET = asyncHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const name = getParamValue<string | null>(searchParams, "name", null);
  const sortPrice = getParamValue<Prisma.SortOrder | null>(
    searchParams,
    "sort-price",
    null
  );
  const sortDiscount = getParamValue<Prisma.SortOrder | null>(
    searchParams,
    "sort-discount",
    null
  );
  const { page, limit } = getPaginationParams(searchParams);

  const where: Prisma.OfferedServiceWhereInput = {
    published: true,
    adminVerified: true,
    ...(name && { title: name }),
  };

  const orderBy: Prisma.OfferedServiceOrderByWithRelationInput[] = [];

  if (sortPrice) orderBy.push({ price: sortPrice });
  if (sortDiscount) orderBy.push({ discount: sortDiscount });

  const findMany: Prisma.OfferedServiceFindManyArgs = {
    where,
    orderBy,
    include: {
      service: true,
      serviceProvider: {
        include: {
          profiles: true,
        },
      },
    },
  };

  const services = await newPaginate({
    model: "offeredService",
    page,
    limit,
    findMany,
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
