import { getQueuedEmails } from "../data-access/queuedEmail";
import { sendQueuedEmail } from "./email/sendQueuedEmail";

export const sendScheduleEmail = async () => {
  const maxTries = 3;

  // Fetch queued emails that haven't been sent and have less than 3 retries
  const queuedEmails = await getQueuedEmails(maxTries);

  for (const email of queuedEmails) {
    await sendQueuedEmail(email);
  }
};
