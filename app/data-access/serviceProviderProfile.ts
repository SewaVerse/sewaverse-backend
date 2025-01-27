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

export const getExistingServiceProviderProfile = dbAsyncHandler(
  async (id: string) => {
    return await db.serviceProviderProfile.findUnique({
      where: { serviceProviderId: id },
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

export const getServiceProviderProfile = dbAsyncHandler(
  async (serviceProviderId: string) => {
    return await db.serviceProviderProfile.findUnique({
      where: { serviceProviderId },
      include: {
        file: {
          include: {
            fileBinaries: true,
          },
        },
        workExperiences: {
          include: {
            file: {
              include: {
                fileBinaries: true,
              },
            },
          },
        },
        licenses: {
          include: {
            file: {
              include: {
                fileBinaries: true,
              },
            },
          },
        },
        awards: {
          include: {
            file: {
              include: {
                fileBinaries: true,
              },
            },
          },
        },
        myWorks: {
          include: {
            workImages: {
              include: {
                image: {
                  include: {
                    fileBinaries: true,
                  },
                },
              },
            },
          },
        },
        serviceMappings: {
          include: {
            service: {
              omit: { isActive: true, createdAt: true, updatedAt: true },
            },
          },
        },
      },
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
