import db from "@/lib/db";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { Service } from "@prisma/client";

export const createService = dbAsyncHandler(
  async (data: Service, imageId: string | null) => {
    const service = await db.service.create({
      data: {
        name: data.name,
        description: data.description || null,
        parentServiceId: data.parentServiceId || null,
        imageId,
        isActive: data.isActive || true,
      },
    });

    return service;
  }
);

export const getServiceById = dbAsyncHandler(async (id: string) => {
  return await db.service.findUnique({
    where: { id },
  });
});

export const updateServiceById = dbAsyncHandler(
  async (id: string, data: any) => {
    return await db.service.update({
      where: { id },
      data,
    });
  }
);

export const deleteServiceById = dbAsyncHandler(async (id: string) => {
  return await db.service.delete({
    where: { id },
  });
});

export const getAllServices = dbAsyncHandler(async () => {
  return await db.service.findMany({ where: { isActive: true } });
});

export const getAllLatestServices = dbAsyncHandler(async () => {
  return await db.service.findMany({
    where: { isActive: true },
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const getAllActiveServices = dbAsyncHandler(async () => {
  return await db.service.findMany({
    where: {
      isActive: true,
    },
  });
});

export const getAllInactiveServices = dbAsyncHandler(async () => {
  return await db.service.findMany({
    where: {
      isActive: false,
    },
  });
});

//Get service by service provider Id
// export const getServiceByUserId = dbAsyncHandler(async (userId: string) => {
//   return await db.service.findMany({
//     where: {
//       serviceProviderId,
//     },
//   });
// });

// export  const getServiceByHighPrice = dbAsyncHandler(async () => {
//   return await db.service.findMany({
// where: { isActive: true },
//     orderBy: {
//       price: "desc",
//     },
//   });
// })

// export const getServiceByLowPrice = dbAsyncHandler(async () => {
//   return await db.service.findMany({
// where: { isActive: true },
//     orderBy: {
//       price: "asc",
//     },
//   });
// })

// export const getServicesByPriceRange = dbAsyncHandler(
//   async (minPrice: number, maxPrice: number) => {
//     return await db.service.findMany({
//       where: {
//         price: {
//           gte: minPrice,
//           lte: maxPrice,
//         },
//       },
//       orderBy: {
//         price: "asc",
//       },
//     });
//   }
// );
