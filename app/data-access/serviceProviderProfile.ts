import db from "@/lib/db";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const getServiceProviderProfileById = dbAsyncHandler(
  async (id: string) => {
    return await db.serviceProviderProfile.findUnique({
      where: { id },
    });
  }
);
