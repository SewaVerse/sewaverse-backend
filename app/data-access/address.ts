import { Address } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const upsertAddress = dbAsyncHandler(async (data: Address) => {
  const { id, ...rest } = data;

  return await db.address.upsert({
    where: { id: id || undefined },
    create: { ...rest },
    update: { ...rest },
  });
});
