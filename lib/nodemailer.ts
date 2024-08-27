import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import UserModel from "@/models/Users/User";

interface EmailType {
  recipientEmail: string;
  emailType: string;
  userId: string;
  name?: string;
}

export const sendEmail = async ({
  recipientEmail,
  emailType,
  userId,
  name,
}: EmailType) => {
  let messageContent = "";

  const hashedToken = await bcrypt.hash(userId.toString(), 10);

  try {
    if (emailType === "VERIFY") {
      const existingUser = await UserModel.findOne({
        _id: userId,
      });

      const updateData = {
        verifyEmailToken: hashedToken,
        verifyEmailTokenExpiry: Date.now() + 3600000,
      };
      await existingUser.updateOne(updateData);

      const verifyEmailLink = `${process.env.DOMAIN}/auth/verify?id=${userId}&token=${hashedToken}`;

      messageContent = `
        <p>Greetings ${name || ""},</p>
        <p>Thank you for registering with us.</p>
        <p>Click the  <a href="${verifyEmailLink}">BUTTON</a> to verify your email.</p>
        <p>Please use this button to verify your email.</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not initiate this request, please ignore this email.</p>
        <p>Best regards,<br>The SewaVerse Team</p>
      `;
    } else if (emailType === "RESET") {
      const resetLink = `${process.env.DOMAIN}/auth/resetpassword?id=${userId}&token=${hashedToken}`;

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
      to: recipientEmail,
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
