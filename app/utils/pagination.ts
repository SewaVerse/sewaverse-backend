/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

import db from "@/lib/db";

// Define a type for valid model names in Prisma
type PrismaModel = keyof PrismaClient;

type PaginationType<T, K, L> = {
  model: T;
  where: K;
  include?: L;
  page?: number; // Optional for default values
  limit?: number; // Optional for default values
};

const paginate = async <
  T extends PrismaModel,
  K extends object,
  L extends object
>({
  model,
  where = {} as K,
  include,
  page = 1,
  limit = 10,
}: PaginationType<T, K, L>) => {
  const skip = (page - 1) * limit;

  const modelDelegate = db[model] as PrismaClient[T] as any;

  // Fetch the paginated records
  const data = await modelDelegate.findMany({
    where,
    include,
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
