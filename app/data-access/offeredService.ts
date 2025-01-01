import { Prisma } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const getOfferedService = dbAsyncHandler(async (id: string) => {
  return await db.offeredService.findUnique({
    where: { id },
  });
});

export const createOfferedService = dbAsyncHandler(
  async (data: Prisma.OfferedServiceUncheckedCreateInput) => {
    return await db.offeredService.create({
      data,
    });
  }
);

export const updateOfferedService = dbAsyncHandler(
  async (
    id: string,
    data: Prisma.OfferedServiceUncheckedUpdateInput,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    return await prismaClient.offeredService.update({
      where: { id },
      data,
    });
  }
);
