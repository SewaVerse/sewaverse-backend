import { Prisma } from "@prisma/client";

import db from "@/lib/db";
export default async function seedCompany(
  tx: Prisma.TransactionClient | null = null
) {
  const prismaClient = tx || db;

  // check if company already exists
  const company = await prismaClient.company.findFirst();

  if (company) {
    console.warn("Company already exists. Skipping seeding...");
    return;
  }

  const companyData = {
    name: "Sewaverse Pvt. Ltd.",
  } as Prisma.CompanyCreateInput;

  await prismaClient.company.create({
    data: companyData,
  });

  console.warn("Company seeded successfully.");
}
