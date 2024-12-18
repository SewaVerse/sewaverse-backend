import db from "@/lib/db";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const getAccountByUserId = dbAsyncHandler(async (userId: string) => {
  return await db.account.findFirst({
    where: { userId },
  });
});
