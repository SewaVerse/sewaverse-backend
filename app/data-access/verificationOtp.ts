import db from "@/lib/db";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";

export const getPasswordResetOtpByEmail = dbAsyncHandler(
  async (email: string, otp: string) => {
    return await db.passwordResetToken.findFirst({
      where: { email, otp },
    });
  }
);

export const deleteOtpByEmail = dbAsyncHandler(async (email: string) => {
  return await db.passwordResetToken.updateMany({
    where: { email },
    data: { otp: null }, // Setting the otp field to null
  });
});
