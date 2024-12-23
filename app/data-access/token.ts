import { v4 as uuidv4 } from "uuid";

import db from "@/lib/db";

import { getPasswordResetTokenByEmail } from "./passwordToken";
import { getVerificationTokenByEmail } from "./verificationToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generatePasswordResetOtp = async (email: string) => {
   const token = uuidv4();
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

  const passwordResetOtp = await db.passwordResetToken.create({
    data: {
      email,
      token,
      otp,
      expires,
    },
  });
  return passwordResetOtp;
};
