import {
  Address,
  CompanyDetails,
  Prisma,
  ServiceProvider,
  ServiceProviderProfile,
} from "@prisma/client";

import { dbAsyncHandler } from "@/app/utils/asyncHelper/dbAsyncHandler";
import db from "@/lib/db";

import { upsertAddress } from "./address";

export const getServiceProviderByUserId = dbAsyncHandler(
  async (userId: string) => {
    return await db.serviceProvider.findUnique({
      where: { userId },
      include: {
        profiles: true,
      },
    });
  }
);

export const getServiceProviderByUserIdWithInclude = dbAsyncHandler(
  async (userId: string, include: Prisma.ServiceProviderInclude = {}) => {
    return await db.serviceProvider.findUnique({
      where: { userId },
      include,
    });
  }
);

export const getServiceProviderById = dbAsyncHandler(async (id: string) => {
  return await db.serviceProvider.findUnique({
    where: { id },
  });
});

export const createServiceProvider = dbAsyncHandler(
  async (data: ServiceProvider, tx: Prisma.TransactionClient | null = null) => {
    const prismaClient = tx || db;
    return await prismaClient.serviceProvider.create({
      data,
    });
  }
);

export const updateServiceProvider = dbAsyncHandler(
  async (
    id: string,
    data: Prisma.ServiceProviderUncheckedUpdateInput,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    return await prismaClient.serviceProvider.update({
      where: { id },
      data,
    });
  }
);

export const createServiceProviderProfile = dbAsyncHandler(
  async (
    data: ServiceProviderProfile,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    // console.warn("data", ...data);
    return await prismaClient.serviceProviderProfile.create({
      data: {
        ...data,
      },
    });
  }
);

export const getServiceProviderProfile = dbAsyncHandler(
  async (userId: string) => {
    const serviceProvider = await db.serviceProvider.findFirst({
      where: { userId },
    });

    if (!serviceProvider) {
      throw new Error("Service Provider not found");
    }

    const profile = await db.serviceProviderProfile.findFirst({
      where: { serviceProviderId: serviceProvider.id },
    });

    if (!profile) {
      throw new Error("Service Provider Profile not found");
    }

    return profile;
  }
);

export const updateServiceProviderProfile = dbAsyncHandler(
  async (profileId: string, data: Partial<ServiceProviderProfile>) => {
    const currentProfile = await db.serviceProviderProfile.findUnique({
      where: { id: profileId },
    });

    if (!currentProfile) {
      throw new Error("Profile not found");
    }

    const services = data?.serviceSubCategory?.map((str) => ({
      serviceId: str,
    }));

    await db.serviceProviderProfile.update({
      where: { id: profileId },
      data: {
        about: data.about ?? currentProfile.about,
        profession: data.profession ?? currentProfile.profession,
        skills: data.skills ?? currentProfile.skills,
        experience: data.experience ?? currentProfile.experience,
        location: data.location ?? currentProfile.location,
        imageId: data.imageId ?? currentProfile.imageId,
        serviceSubCategory:
          data.serviceSubCategory ?? currentProfile.serviceSubCategory,
        serviceMappings: {
          deleteMany: {}, // clear exisitings
          createMany: {
            data: services ?? [],
          },
        },
      },
    });
  }
);

export const createServiceProviderAddress = dbAsyncHandler(
  async (
    serviceProviderId: string,
    data: Address,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    const saveAddress = await upsertAddress(data, prismaClient);

    await prismaClient.serviceProviderAddressMapping.create({
      data: {
        serviceProviderId: serviceProviderId,
        addressId: saveAddress.id,
      },
    });

    return saveAddress;
  }
);

export const createCompanyDetail = dbAsyncHandler(
  async (data: CompanyDetails) => {
    return await db.companyDetails.create({
      data,
    });
  }
);
