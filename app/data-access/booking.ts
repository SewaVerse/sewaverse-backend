import { Prisma } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const createBooking = dbAsyncHandler(
  async (data: Prisma.BookingUncheckedCreateInput) => {
    return await db.booking.create({
      data,
    });
  }
);

export const getAllBookingsByUserId = dbAsyncHandler(async (userId: string) => {
  return await db.booking.findMany({
    where: {
      userId,
    },
    include: {
      offeredService: {
        omit: { adminVerified: true, createdAt: true, updatedAt: true },
        include: {
          service: {
            omit: { isActive: true, createdAt: true, updatedAt: true },
          },
        },
      },
    },
  });
});
