import { QueuedEmail } from "@prisma/client";

import db from "@/lib/db";

import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { sendQueuedEmail } from "../utils/email/sendQueuedEmail";

export const createQueuedEmail = dbAsyncHandler(
  async (data: QueuedEmail, sendImmediately = false) => {
    const email = await db.queuedEmail.create({
      data: {
        ...data,
        sentAt: null,
        sendImmediately,
      },
    });

    if (sendImmediately) {
      await sendQueuedEmail(email);
    }

    return email;
  }
);

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
