import db from "@/lib/db";

import seedCompany from "./seed/companySeed";
import seedLedgerAccount from "./seed/ledgerAccountSeed";
import seedUser from "./seed/userSeed";

async function seed() {
  await db.$transaction(async (tx) => {
    await seedCompany(tx);
    await seedLedgerAccount(tx);
    await seedUser(tx);
  });
}

console.warn(
  "\n------------------- Starting seed process -------------------\n"
);
seed()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.warn(
      "\n------------------- Ending seed process -------------------\n"
    );
    process.exit(0);
  });
