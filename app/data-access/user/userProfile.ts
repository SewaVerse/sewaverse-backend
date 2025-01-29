import { dbAsyncHandler } from "@/app/utils/asyncHelper/dbAsyncHandler";
import db from "@/lib/db";

export const getUserProfileById = dbAsyncHandler(async (id: string) => {
  return await db.userProfile.findUnique({
    where: { id },
  });
});

export const getUserProfileByUserId = dbAsyncHandler(async (userId: string) => {
  return await db.userProfile.findUnique({
    where: { userId },
  });
});
