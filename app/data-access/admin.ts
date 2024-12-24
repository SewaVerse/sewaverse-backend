import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const getAllUserByAdmin = dbAsyncHandler(async () => {
  return await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const verifyServiceProvider = dbAsyncHandler(async (id: string) => {
  await db.serviceProvider.findFirst({
    where: { id: id },
  });
  const updatedServiceProvider = await db.serviceProvider.update({
    where: { id: id },
    data: { isAdminVerified: true },
  });

  return updatedServiceProvider;
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
