import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const getAllUserByAdmin = dbAsyncHandler(async () => {
  return await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});

// export const getAllVerifiedUserByAdmin = dbAsyncHandler(async () => {
//   return await db.user.findMany({
//     where: {
//       //isVerified: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// });

// export const getAllUnverifiedUserByAdmin = dbAsyncHandler(async () => {
//   return await db.user.findMany({
//     where: {
//       isVerified: false,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// });
