import { dbAsyncHandler } from "@/app/utils/asyncHelper/dbAsyncHandler";
import db from "@/lib/db";

export const getPasswordResetTokenByEmail = dbAsyncHandler(
  async (email: string) => {
    return await db.passwordResetToken.findFirst({
      where: { email },
    });
  }
);

export const getPasswordResetTokenByToken = dbAsyncHandler(
  async (token: string) => {
    return await db.passwordResetToken.findUnique({
      where: { token },
    });
  }
);

export const deletePasswordResetTokenById = dbAsyncHandler(
  async (id: string) => {
    return await db.passwordResetToken.delete({
      where: { id },
    });
  }
);
