import { Prisma } from "@prisma/client";

import { hash } from "@/app/utils/common";
import db from "@/lib/db";
export default async function seedUser(
  tx: Prisma.TransactionClient | null = null
) {
  const prismaClient = tx || db;

  // check if user already exists
  const user = await prismaClient.user.findFirst();

  if (user) {
    console.warn("User already exists. Skipping seeding...");
    return;
  }

  const roles = [
    {
      role: "USER",
    },
    {
      role: "ADMIN",
    },
  ];

  const userSeed = {
    name: "Super Admin",
    email: "admin@sewaverse.com",
    emailVerified: new Date(),
    password: await hash("Admin@123"),
    acceptTerms: true,
    userProfile: {
      create: {
        gender: "MALE",
        phoneNumber: "1234567890",
      },
    },
    roles: {
      createMany: {
        data: roles,
      },
    },
  } as Prisma.UserCreateInput;

  await prismaClient.user.create({
    data: userSeed,
  });

  console.warn("User seeded successfully.");
}
