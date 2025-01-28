import { Prisma } from "@prisma/client";

import db from "@/lib/db";

type TSeedAccount = {
  name: string;
  children?: TSeedAccount[];
};

const ledgerAccounts: TSeedAccount[] = [
  {
    name: "Assets",
    children: [{ name: "Cash" }, { name: "Bank" }],
  },
  {
    name: "Liabilities",
    children: [
      { name: "User Accounts", children: [] },
      { name: "Payables to Service Providers" }, // Amounts owed to service providers
      { name: "Refunds Payable" }, // Amounts owed to users for refunds
    ],
  },
  {
    name: "Income",
    children: [
      { name: "Service Fees" }, // Revenue from platform fees
      { name: "Commission" }, // Revenue from service provider commissions
    ],
  },
  {
    name: "Expenses",
    children: [
      { name: "Platform Maintenance" }, // Costs for maintaining the platform
      { name: "Marketing" }, // Advertising and promotions
      { name: "Refunds" }, // Refund amounts issued to users
      { name: "Transaction Fees" }, // Bank or payment gateway charges
    ],
  },
  {
    name: "Equity",
    children: [
      { name: "Owner's Equity" }, // Owner's capital in the business
      { name: "Retained Earnings" }, // Profits retained in the business
    ],
  },
];

export default async function seedLedgerAccount(
  tx: Prisma.TransactionClient | null = null
) {
  const prismaClient = tx || db;

  // check if ledger account already exists
  const lederAccount = await prismaClient.ledgerAccount.findFirst();

  if (lederAccount) {
    console.warn("Leder account already exists. Skipping seeding...");
    return;
  }

  // Recursive function to create ledger accounts
  async function createLedgerAccount(
    account: TSeedAccount,
    parentId: string | null = null
  ) {
    // Create the current ledger account
    const createdAccount = await prismaClient.ledgerAccount.create({
      data: {
        name: account.name,
        parentId,
        isSystemAccount: true,
      },
    });

    // If there are children, recursively create them
    if (account.children && account.children.length > 0) {
      for (const child of account.children) {
        await createLedgerAccount(child, createdAccount.id);
      }
    }
  }

  // Iterate over the top-level accounts and start the recursive process
  for (const account of ledgerAccounts) {
    await createLedgerAccount(account);
  }

  console.warn("Ledger account seeded successfully.");
}
