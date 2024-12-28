import { StateProvince } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const createStateProvince = dbAsyncHandler(
  async (data: StateProvince) => {
    return await db.stateProvince.create({
      data,
    });
  }
);

export const getStateProvinceById = dbAsyncHandler(async (id: string) => {
  return await db.stateProvince.findUnique({
    where: { id },
  });
});

export const getStateProvinceByCountryId = dbAsyncHandler(
  async (countryId: string) => {
    return await db.stateProvince.findMany({
      where: { countryId },
    });
  }
);

export const getStateProvinceByName = dbAsyncHandler(
  async (name: string, countryId: string) => {
    return await db.stateProvince.findUnique({
      where: { countryId_name: { countryId, name } },
    });
  }
);

export const updateStateProvinceById = dbAsyncHandler(
  async (id: string, data: Partial<StateProvince>) => {
    return await db.stateProvince.update({
      where: { id },
      data,
    });
  }
);

export const deleteStateProvinceById = dbAsyncHandler(async (id: string) => {
  return await db.stateProvince.delete({
    where: { id },
  });
});
