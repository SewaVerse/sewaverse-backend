import { Prisma } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const createReview = dbAsyncHandler(
  async (data: Prisma.ReviewUncheckedCreateInput) => {
    return await db.review.create({
      data,
    });
  }
);

export const getReviewById = dbAsyncHandler(async (id: string) => {
  return await db.review.findUnique({
    where: { id },
  });
});

export const getReviewsByOfferedServiceId = dbAsyncHandler(
  async (offeredServiceId: string) => {
    return await db.review.findMany({
      where: { offeredServiceId },
    });
  }
);

export const updateReviewById = dbAsyncHandler(
  async (id: string, data: Prisma.ReviewUncheckedUpdateInput) => {
    return await db.review.update({
      where: { id },
      data,
    });
  }
);
