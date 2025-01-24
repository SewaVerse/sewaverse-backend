import db from "@/lib/db";

import seedCompany from "./companySeed";

async function seed() {
  await db.$transaction(async (tx) => {
    await seedCompany(tx);
  });
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.warn("Seed process finished. Exiting...");
    process.exit(0);
  });
