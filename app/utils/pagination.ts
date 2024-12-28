/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

import db from "@/lib/db";

// Define a type for valid model names in Prisma
type PrismaModel = keyof PrismaClient;

const paginate = async <T extends PrismaModel, K extends object>(
  model: T,
  where: K,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;

  const modelDelegate = db[model] as PrismaClient[T] as any;

  // Fetch the paginated records
  const data = await modelDelegate.findMany({
    where,
    skip,
    take: limit,
  });

  // Fetch the total count for pagination metadata
  const totalCount = await modelDelegate.count({
    where,
  });

  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
    },
  };
};

export default paginate;
