import { createQueuedEmail } from "@/app/data-access/queuedEmail";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const fromEmail = process.env.SMTP_EMAIL!;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`;

  await createQueuedEmail({
    from: fromEmail,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/email-verification?token=${token}`;

  await createQueuedEmail({
    from: fromEmail,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
