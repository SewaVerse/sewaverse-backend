import { QueuedEmail } from "@prisma/client";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const Transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE!,
  host: process.env.SMTP_HOST!,
  port: parseInt(process.env.SMTP_PORT!),
  secure: process.env.SMTP_SECURE == "true",
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
} as SMTPTransport.Options);

const sendEmail = async (queuedEmail: QueuedEmail) => {
  try {
    const mailOptions = {
      from: queuedEmail.from,
      to: queuedEmail.to,
      subject: queuedEmail.subject,
      html: queuedEmail.body,
    };

    // send email
    await Transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { sendEmail, Transporter };
