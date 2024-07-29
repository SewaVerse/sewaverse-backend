import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Use the email service you are using
  auth: {
    user: process.env.GMAIL, // Your email address
    pass: process.env.GMAIL_PASSWORD, // Your email password
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL, // Sender address
      to, // List of recipients
      subject, // Subject line
      text, // Plain text body
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};