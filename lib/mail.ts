import { QueuedEmail } from "@prisma/client";

import { createQueuedEmail } from "@/app/data-access/queuedEmail";
import { dbAsyncHandler } from "@/app/utils/asyncHelper/dbAsyncHandler";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const fromEmail = process.env.SMTP_EMAIL!;

export const sendPasswordResetEmail = dbAsyncHandler(
  async (email: string, token: string) => {
    const resetLink = `${domain}/reset-password/${token}`;

    return await createQueuedEmail(
      {
        from: fromEmail,
        to: email,
        subject: "Reset your password",
        body: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
      } as QueuedEmail,
      true
    );
  }
);

export const sendPaswordResetOtpEmail = dbAsyncHandler(
  async (email: string, otp: string) => {
    return await createQueuedEmail({
      from: fromEmail,
      to: email,
      subject: "Reset your password",
      body: `<p>OTP: ${otp}</p>`,
    } as QueuedEmail);
  }
);

export const sendVerificationEmail = dbAsyncHandler(
  async (email: string, token: string) => {
    const confirmLink = `${domain}/email-verification/${token}`;

    return await createQueuedEmail(
      {
        from: fromEmail,
        to: email,
        subject: "Confirm your email",
        body: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
      } as QueuedEmail,
      true
    );
  }
);
