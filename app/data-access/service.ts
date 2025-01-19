import { Prisma, Service } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { creatPrismaFileFromFile } from "./file";

export const createService = dbAsyncHandler(
  async (
    data: Prisma.ServiceUncheckedCreateInput,
    file: File | null = null
  ) => {
    const service = await db.$transaction(async (transaction) => {
      let imageId: string | null = null;

      if (file) {
        const createdFile = await creatPrismaFileFromFile(file);

        imageId = createdFile.id;
      }
      const createdService = await transaction.service.create({
        data: {
          name: data.name,
          description: data.description || null,
          parentServiceId: data.parentServiceId || null,
          imageId,
          isActive: data.isActive || true,
          createdBy: data.createdBy,
        },
      });
      return createdService;
    });

    return service;
  }
);

export const getServiceById = dbAsyncHandler(async (id: string) => {
  return await db.service.findUnique({
    where: { id },
  });
});

export const getServicesByCreatedUserId = dbAsyncHandler(
  async (createdUserId: string) => {
    return await db.service.findMany({
      where: { createdBy: createdUserId },
      include: {
        parentService: true,
        createdUser: {
          select: {
            name: true,
          },
        },
        file: true,
      },
    });
  }
);

export const updateServiceById = dbAsyncHandler(
  async (id: string, data: Prisma.ServiceUncheckedUpdateInput) => {
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

type ServiceHierarchy = Omit<
  Service,
  "isActive" | "imageId" | "createdAt" | "updatedAt"
> & {
  services: ServiceHierarchy[];
};

export const getServicesHierarchy = dbAsyncHandler(async () => {
  const fetchHierarchy = async (
    parentServiceId: string | null
  ): Promise<ServiceHierarchy[]> => {
    const services = await db.service.findMany({
      omit: { isActive: true, imageId: true, createdAt: true, updatedAt: true },
      where: { isActive: true, parentServiceId },
    });

    return await Promise.all(
      services.map(async (service) => ({
        ...service,
        services: await fetchHierarchy(service.id),
      }))
    );
  };

  return await fetchHierarchy(null); // Start with the root level
});

export const getPaginatedServices = dbAsyncHandler(
  async (skip: number, take: number) => {
    return await db.service.findMany({
      where: { isActive: true },
      skip,
      take,
    });
  }
);

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
