import { District } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const createDistrict = dbAsyncHandler(async (data: District) => {
  return await db.district.create({
    data,
  });
});

export const getDistrictById = dbAsyncHandler(async (id: string) => {
  return await db.district.findUnique({
    where: { id },
  });
});

export const getDistrictByName = dbAsyncHandler(
  async (name: string, stateProvinceId: string) => {
    return await db.district.findUnique({
      where: { stateProvinceId_name: { stateProvinceId, name } },
    });
  }
);

export const getDistrictByStateProvinceId = dbAsyncHandler(
  async (stateProvinceId: string) => {
    return await db.district.findMany({
      where: { stateProvinceId },
    });
  }
);

export const updateDistrictById = dbAsyncHandler(
  async (id: string, data: Partial<District>) => {
    return await db.district.update({
      where: { id },
      data,
    });
  }
);

export const deleteDistrictById = dbAsyncHandler(async (id: string) => {
  return await db.district.delete({
    where: { id },
  });
});
