import db from "@/lib/db";
import { CompanyDetails, ServiceProvider } from "@prisma/client";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

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

export const createCompanyDetail = dbAsyncHandler(
  async (data: CompanyDetails) => {
    return await db.companyDetails.create({
      data,
    });
  }
);
