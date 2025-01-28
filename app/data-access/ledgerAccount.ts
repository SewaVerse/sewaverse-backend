import { Prisma } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const createLedgerAccount = dbAsyncHandler(
  async (account: Prisma.LedgerAccountUncheckedCreateInput) => {
    return await db.ledgerAccount.create({ data: account });
  }
);

export const getLedgerAccountById = dbAsyncHandler(async (id: string) => {
  return await db.ledgerAccount.findUnique({ where: { id } });
});

export const getLedgerAccountByName = dbAsyncHandler(async (name: string) => {
  return await db.ledgerAccount.findUnique({ where: { name } });
});

export const getLedgerAccountsByParentId = dbAsyncHandler(
  async (parentId: string) => {
    return await db.ledgerAccount.findMany({ where: { parentId } });
  }
);

export const updateLedgerAccountById = dbAsyncHandler(
  async (id: string, data: Prisma.LedgerAccountUncheckedUpdateInput) => {
    return await db.ledgerAccount.update({ where: { id }, data });
  }
);

export const deleteLedgerAccountById = dbAsyncHandler(async (id: string) => {
  return await db.ledgerAccount.delete({ where: { id } });
});
