import { Address, Prisma } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const upsertAddress = dbAsyncHandler(
  async (data: Address, tx: Prisma.TransactionClient | null = null) => {
    const prismaClient = tx || db;
    if (data.id) {
      return await updateAddress(data.id, data, prismaClient);
    }

    return await createAddress(data, prismaClient);
  }
);

const createAddress = dbAsyncHandler(
  async (
    data: Prisma.AddressUncheckedCreateInput,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    return await prismaClient.address.create({
      data,
    });
  }
);

const updateAddress = dbAsyncHandler(
  async (
    id: string,
    data: Prisma.AddressUncheckedUpdateInput,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    return await prismaClient.address.update({
      where: { id },
      data,
    });
  }
);
