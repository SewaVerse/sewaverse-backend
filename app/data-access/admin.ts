import db from "@/lib/db";
import { dbAsyncHandler } from "../utils/dbAsyncHandler";


export const getAllUserByAdmin = dbAsyncHandler(async () => {
  return await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});
