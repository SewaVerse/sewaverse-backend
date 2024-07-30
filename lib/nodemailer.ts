import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Users from "@/models/User";
import { generateOTP } from "./otp";

export const sendEmail = async ({
  email,
  emailType,
  userId,
  name,
}: {
  email: string;
  emailType: string;
  userId: string;
  name: string;
}) => {

  const { code:otp, expiresAt } = generateOTP();

  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await Users.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: expiresAt,
      });
    } else if (emailType === "RESET") {
      await Users.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: expiresAt,
      });
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
        <p>Greetings ${name || ""},</p>
        <p>Thank you for ${
          emailType === "VERIFY"
            ? "registering with us"
            : "requesting a password reset"
        }.</p>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>Please use this code to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }.</p>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you did not initiate this request, please ignore this email.</p>
        <p>Best regards,<br>The SewaVerse Team</p>
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
