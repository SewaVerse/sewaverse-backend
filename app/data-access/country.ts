import { Country } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const createCountry = dbAsyncHandler(async (data: Country) => {
  return await db.country.create({
    data,
  });
});

export const getCountryById = dbAsyncHandler(async (id: string) => {
  return await db.country.findUnique({
    where: { id },
  });
});

export const getCountryByName = dbAsyncHandler(async (name: string) => {
  return await db.country.findUnique({
    where: { name },
  });
});

export const updateCountryById = dbAsyncHandler(
  async (id: string, data: Partial<Country>) => {
    return await db.country.update({
      where: { id },
      data,
    });
  }
);

export const deleteCountryById = dbAsyncHandler(async (id: string) => {
  return await db.country.delete({
    where: { id },
  });
});
