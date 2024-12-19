import db from "@/lib/db";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const getVerificationTokenByEmail = dbAsyncHandler(
  async (email: string) => {
    return await db.verificationToken.findFirst({
      where: { email },
    });
  }
);

export const getVerificationTokenByToken = dbAsyncHandler(
  async (token: string) => {
    return await db.verificationToken.findUnique({
      where: { token },
    });
  }
);

export const deleteVerificationTokenById = dbAsyncHandler(
  async (id: string) => {
    return await db.verificationToken.delete({
      where: { id },
    });
  }
);
