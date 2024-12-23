import db from "@/lib/db";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const getPasswordResetOtpByEmail = dbAsyncHandler(
  async (email: string, otp: string) => {
    return await db.passwordResetToken.findFirst({
      where: { email, otp },
    });
  }
);
