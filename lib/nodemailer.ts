import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { generateOTP } from "./otp";
import UserModel from "@/models/User";

export const sendEmail = async ({
  email,
  emailType,
  userId,
  name,
}: {
  email: string;
  emailType: string;
  userId: string;
  name?: string;
}) => {
  const { generatedCode, expiresAt } = generateOTP();
  let messageContent = "";

  try {
    if (emailType === "VERIFY") {
      await UserModel.findByIdAndUpdate(userId, {
        verifyCode: generatedCode,
        verifyCodeExpiry: expiresAt,
      });

      messageContent = `
        <p>Greetings ${name || ""},</p>
        <p>Thank you for registering with us.</p>
        <p>Your verification code is: <strong>${generatedCode}</strong></p>
        <p>Please use this code to verify your email.</p>
        <p>This code will expire in 1 hour.</p>
        <p>If you did not initiate this request, please ignore this email.</p>
        <p>Best regards,<br>The SewaVerse Team</p>
      `;
    } else if (emailType === "RESET") {
      const hashedToken = await bcrypt.hash(process.env.JWT_SECRET_KEY!, 10);
      const resetLink = `${process.env.DOMAIN}/api/auth/serviceproviderresetpassword?token=${hashedToken}`;

      await UserModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, 
      });

      messageContent = `
        <p>Greetings ${name || ""},</p>
        <p>We received a request to reset your password.</p>
        <p>Click <a href="${resetLink}">here</a> to reset your password, or copy and paste the link below into your browser:</p>
        <p>${resetLink}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br>The SewaVerse Team</p>
      `;
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
      html: messageContent,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
