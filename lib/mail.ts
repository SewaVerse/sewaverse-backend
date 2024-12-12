import { createQueuedEmail } from "@/app/data-access/queuedEmail";
import { dbAsyncHandler } from "@/app/utils/dbAsyncHandler";
import { QueuedEmail } from "@prisma/client";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const fromEmail = process.env.SMTP_EMAIL!;

export const sendPasswordResetEmail = dbAsyncHandler(
  async (email: string, token: string) => {
    const resetLink = `${domain}/reset-password?token=${token}`;

    return await createQueuedEmail({
      from: fromEmail,
      to: email,
      subject: "Reset your password",
      body: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    } as QueuedEmail);
  }
);

export const sendVerificationEmail = dbAsyncHandler(
  async (email: string, token: string) => {
    const confirmLink = `${domain}/email-verification?token=${token}`;

    return await createQueuedEmail({
      from: fromEmail,
      to: email,
      subject: "Confirm your email",
      body: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    } as QueuedEmail);
  }
);
