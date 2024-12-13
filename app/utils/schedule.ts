import { QueuedEmail } from "@prisma/client";
import {
  getQueuedEmails,
  updateQueuedEmailById,
} from "../data-access/queuedEmail";
import { sendEmail } from "./sendEmail";

export const sendScheduleEmail = async () => {
  const maxTries = 3;

  // Fetch queued emails that haven't been sent and have less than 3 retries
  const queuedEmails = await getQueuedEmails(maxTries);

  for (const email of queuedEmails) {
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
  }
};
