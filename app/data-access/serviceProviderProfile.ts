import { Prisma } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const getServiceProviderProfileById = dbAsyncHandler(
  async (id: string) => {
    return await db.serviceProviderProfile.findUnique({
      where: { id },
    });
  }
);

export const getServiceProviderProfileByServiceProviderId = dbAsyncHandler(
  async (serviceProviderId: string) => {
    return await db.serviceProviderProfile.findUnique({
      where: { serviceProviderId },
    });
  }
);

export const updateServiceProviderProfile = dbAsyncHandler(
  async (
    id: string,
    data: Prisma.ServiceProviderProfileUncheckedUpdateInput,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;

    return await prismaClient.serviceProviderProfile.update({
      where: { id },
      data,
    });
  }
);
