import db from "@/lib/db";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { ServiceProviderProfileSchema } from "../schemas/serviceProviderSchema";

export const createServiceProviderProfile = dbAsyncHandler(
  async (
    data: ServiceProviderProfileSchema & {
      serviceProviderId: string;
      imageId: string | null;
    }
  ) => {
    return await db.serviceProviderProfile.create({
      data: {
        serviceProviderId: data.serviceProviderId,
        profession: data.profession,
        skills: data.skills,
        serviceSubCategory: data.serviceSubCategory,
        imageId: data.imageId,
      },
    });
  }
);
