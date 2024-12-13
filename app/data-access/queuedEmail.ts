import db from "@/lib/db";
import { QueuedEmail } from "@prisma/client";
import { dbAsyncHandler } from "../utils/dbAsyncHandler";

export const createQueuedEmail = dbAsyncHandler(async (data: QueuedEmail) => {
  return await db.queuedEmail.create({
    data: {
      ...data,
      sentAt: null,
    },
  });
});

export const updateQueuedEmailById = dbAsyncHandler(
  async (id: string, data: QueuedEmail) => {
    return await db.queuedEmail.update({
      where: { id },
      data,
    });
  }
);

export const getQueuedEmails = dbAsyncHandler(async (maxTries: number) => {
  return await db.queuedEmail.findMany({
    where: {
      sentAt: null,
      sendImmediately: false,
      sentTries: {
        lt: maxTries,
      },
    },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });
});
