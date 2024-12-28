import { Municipality } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const createMunicipality = dbAsyncHandler(async (data: Municipality) => {
  return await db.municipality.create({
    data,
  });
});

export const getMunicipalityById = dbAsyncHandler(async (id: string) => {
  return await db.municipality.findUnique({
    where: { id },
  });
});

export const getMunicipalityByName = dbAsyncHandler(
  async (name: string, districtId: string) => {
    return await db.municipality.findUnique({
      where: { districtId_name: { districtId, name } },
    });
  }
);

export const getMunicipalityByDistrictId = dbAsyncHandler(
  async (districtId: string) => {
    return await db.municipality.findMany({
      where: { districtId },
    });
  }
);

export const updateMunicipalityById = dbAsyncHandler(
  async (id: string, data: Partial<Municipality>) => {
    return await db.municipality.update({
      where: { id },
      data,
    });
  }
);

export const deleteMunicipalityById = dbAsyncHandler(async (id: string) => {
  return await db.municipality.delete({
    where: { id },
  });
});
