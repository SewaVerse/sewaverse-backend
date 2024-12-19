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
