import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import paginate from "@/app/utils/pagination";
import { getPaginationParams } from "@/app/utils/paramHelper";

export const GET = roleAsyncHandler("ADMIN", async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const { page, limit } = getPaginationParams(searchParams);

  const serviceWhere: Prisma.ServiceWhereInput = {};

  const include: Prisma.ServiceInclude = {
    file: true,
    parentService: true,
  };

  const { data, pagination } = await paginate({
    model: "service",
    where: serviceWhere,
    include,
    page,
    limit,
  });

  return NextResponse.json(
    {
      success: true,
      message: "Services fetched successfully",
      services: data,
      pagination,
    },
    { status: 200 }
  );
});
