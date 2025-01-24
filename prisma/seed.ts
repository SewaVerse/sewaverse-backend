import db from "@/lib/db";

import seedCompany from "./seed/companySeed";
import seedUser from "./seed/userSeed";

async function seed() {
  await db.$transaction(async (tx) => {
    await seedCompany(tx);
    await seedUser(tx);
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
