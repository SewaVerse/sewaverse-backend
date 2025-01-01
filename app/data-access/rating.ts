import { Prisma } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { calculateOverallRating } from "../utils/ratingHelper";
import { getOfferedService, updateOfferedService } from "./offeredService";
import {
  getServiceProviderProfileByServiceProviderId,
  updateServiceProviderProfile,
} from "./serviceProviderProfile";

export const createRating = dbAsyncHandler(
  async (data: Prisma.RatingUncheckedCreateInput) => {
    // get offered service
    const offeredService = await getOfferedService(data.offeredServiceId);

    if (!offeredService) {
      throw new Error("Offered service not found");
    }

    // get service provider profile
    const serviceProviderProfile =
      await getServiceProviderProfileByServiceProviderId(
        offeredService.serviceProviderId
      );

    if (!serviceProviderProfile) {
      throw new Error("Service provider profile not found");
    }

    const currentServiceRatingCount = await getTotalRatingsByOfferedServiceId(
      data.offeredServiceId
    );

    const rating = await db.$transaction(async (transaction) => {
      const createdRating = await transaction.rating.create({
        data,
      });

      // update offered service
      await updateOfferedService(
        offeredService.id,
        {
          overallRating: calculateOverallRating({
            oldOverallRating: offeredService.overallRating,
            oldRatingCount: currentServiceRatingCount,
            newRating: data.rating,
          }),
        },
        transaction
      );

      // update service provider profile rating
      await updateServiceProviderProfile(
        serviceProviderProfile.id,
        {
          overallRating: calculateOverallRating({
            oldOverallRating: serviceProviderProfile.overallRating,
            oldRatingCount: serviceProviderProfile.totalRatings,
            newRating: data.rating,
          }),
          totalRatings: serviceProviderProfile.totalRatings + 1,
        },
        transaction
      );

      return createdRating;
    });

    return rating;
  }
);

export const getRatingById = dbAsyncHandler(async (id: string) => {
  return await db.rating.findUnique({
    where: { id },
  });
});

export const updateRating = dbAsyncHandler(
  async (ratingId: string, data: Prisma.RatingUncheckedUpdateInput) => {
    const existingRating = await getRatingById(ratingId);

    if (!existingRating) {
      throw new Error("Rating not found");
    }

    // get offered service
    const offeredService = await getOfferedService(
      existingRating.offeredServiceId
    );

    if (!offeredService) {
      throw new Error("Offered service not found");
    }

    // get service provider profile
    const serviceProviderProfile =
      await getServiceProviderProfileByServiceProviderId(
        offeredService.serviceProviderId
      );

    if (!serviceProviderProfile) {
      throw new Error("Service provider profile not found");
    }

    const currentServiceRatingCount = await getTotalRatingsByOfferedServiceId(
      existingRating.offeredServiceId
    );

    const rating = await db.$transaction(async (transaction) => {
      // Update the rating
      const updatedRating = await transaction.rating.update({
        where: { id: ratingId },
        data,
      });

      // Update offered service
      await updateOfferedService(
        offeredService.id,
        {
          overallRating: calculateOverallRating({
            oldOverallRating: offeredService.overallRating,
            oldRatingCount: currentServiceRatingCount,
            newRating: data.rating as number,
            oldRating: existingRating.rating,
          }),
        },
        transaction
      );

      // Update service provider profile rating
      await updateServiceProviderProfile(
        serviceProviderProfile.id,
        {
          overallRating: calculateOverallRating({
            oldOverallRating: serviceProviderProfile.overallRating,
            oldRatingCount: serviceProviderProfile.totalRatings,
            newRating: data.rating as number,
            oldRating: existingRating.rating,
          }),
        },
        transaction
      );

      return updatedRating;
    });

    return rating;
  }
);

export const getTotalRatingsByOfferedServiceId = dbAsyncHandler(
  async (offeredServiceId: string) => {
    return await db.rating.count({
      where: { offeredServiceId },
    });
  }
);
