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
    data: {
      ...companyData,
      financialYears: {
        createMany: {
          data: [
            {
              startDate: new Date("2023-07-17"),
              endDate: new Date("2024-07-15"),
              finYear: "2023-24",
            },
            {
              startDate: new Date("2024-07-16"),
              endDate: new Date("2025-07-16"),
              finYear: "2024-25",
              isActive: true,
            },
          ],
        },
      },
    },
  });

  console.warn("Company seeded successfully.");
}
