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

export const updateServiceProviderProfile = dbAsyncHandler(
  async (id: string, data: any) => {
    return await db.serviceProviderProfile.update({
      where: { id },
      data,
    });
  }
);
