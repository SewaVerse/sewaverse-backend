import { Ward } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const createWard = dbAsyncHandler(async (data: Ward) => {
  return await db.ward.create({
    data,
  });
});

export const getWardById = dbAsyncHandler(async (id: string) => {
  return await db.ward.findUnique({
    where: { id },
  });
});

export const getWardByMunicipalityId = dbAsyncHandler(
  async (municipalityId: string) => {
    return await db.ward.findMany({
      where: { municipalityId },
    });
  }
);

export const updateWardById = dbAsyncHandler(async (id: string, data: Ward) => {
  return await db.ward.update({
    where: { id },
    data,
  });
});

export const deleteWardById = dbAsyncHandler(async (id: string) => {
  return await db.ward.delete({
    where: { id },
  });
});
