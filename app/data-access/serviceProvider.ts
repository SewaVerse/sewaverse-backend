import {
  Address,
  CompanyDetails,
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
    });
  }
);

export const getServiceProviderById = dbAsyncHandler(async (id: string) => {
  return await db.serviceProvider.findUnique({
    where: { id },
  });
});

export const createServiceProvider = dbAsyncHandler(
  async (data: ServiceProvider) => {
    return await db.serviceProvider.create({
      data,
    });
  }
);

export const updateServiceProvider = dbAsyncHandler(
  async (id: string, data: Partial<ServiceProvider>) => {
    return await db.serviceProvider.update({
      where: { id },
      data,
    });
  }
);

export const createServiceProviderProfile = dbAsyncHandler(
  async (data: ServiceProviderProfile) => {
    return await db.serviceProviderProfile.create({
      data,
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

    await db.serviceProviderProfile.update({
      where: { id: profileId },
      data: {
        profession: data.profession ?? currentProfile.profession,
        skills: data.skills ?? currentProfile.skills,
        description: data.description ?? currentProfile.description,
        imageId: data.imageId ?? currentProfile.imageId,
        serviceSubCategory:
          data.serviceSubCategory ?? currentProfile.serviceSubCategory,
      },
    });
  }
);

export const createServiceProviderAddress = dbAsyncHandler(
  async (serviceProviderId: string, data: Address) => {
    const saveAddress = await upsertAddress(data);

    await db.serviceProviderAddressMapping.create({
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
