import { Address } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const upsertAddress = dbAsyncHandler(async (data: Address) => {
  if (data.id) {
    return await db.address.update({
      where: { id: data.id },
      data,
    });
  }

  return await db.address.create({
    data,
  });
});
