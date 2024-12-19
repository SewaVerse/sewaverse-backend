import { updateQueuedEmailById } from "@/app/data-access/queuedEmail";
import { QueuedEmail } from "@prisma/client";
import { sendEmail } from "./sendEmail";

export const sendQueuedEmail = async (email: QueuedEmail) => {
  try {
    await sendEmail(email);

    // If sent successfully, set the sentAt to current date
    email.sentAt = new Date();
  } catch (error) {
    console.error(`Error sending email to ${email.to}:`, error);
  } finally {
    // Increment the sentTries count whether sending was successful or not
    email.sentTries += 1;

    // Update the email record in the database
    await updateQueuedEmailById(email.id, {
      sentTries: email.sentTries,
      sentAt: email.sentAt,
    } as QueuedEmail);
  }
};
