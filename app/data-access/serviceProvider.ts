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

export const createServiceProviderAddress = dbAsyncHandler(
  async (serviceProviderId: string, data: Address) => {
    const saveAddress = await upsertAddress({
      province: data.province,
      district: data.district,
      municipality: data.municipality,
      wardNo: data.wardNo,
      tole: data.tole ?? null,
    } as Address);

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
