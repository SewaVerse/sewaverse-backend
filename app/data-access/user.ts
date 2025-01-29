import {
  Address,
  Prisma,
  Role,
  User,
  UserProfile,
  UserRoleMapping,
} from "@prisma/client";

import { dbAsyncHandler } from "@/app/utils/asyncHelper/dbAsyncHandler";
import db from "@/lib/db";

import { upsertAddress } from "./address";

export const getUserByEmail = dbAsyncHandler(async (email: string) => {
  return await db.user.findUnique({
    where: { email },
    include: { roles: true },
  });
});

export const getUserById = dbAsyncHandler(async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      roles: true,
    },
  });
  if (user) {
    return user;
  }
  return null;
});

export const createUser = dbAsyncHandler(async (data: User) => {
  return await db.user.create({
    data,
  });
});

export const updateUserById = dbAsyncHandler(async (id: string, data: User) => {
  return await db.user.update({
    where: { id },
    data,
  });
});

// user profile
export const createUserProfile = dbAsyncHandler(async (data: UserProfile) => {
  return await db.userProfile.create({
    data,
  });
});

// role mapping
export const createUserRoleMapping = dbAsyncHandler(
  async (data: UserRoleMapping) => {
    return await db.userRoleMapping.create({
      data,
    });
  }
);

export const getRolesByUserId = dbAsyncHandler(async (userId: string) => {
  return await db.userRoleMapping.findMany({
    where: { userId },
  });
});

export const findUsersByRole = dbAsyncHandler(async (role: Role) => {
  return await db.userRoleMapping.findMany({
    where: { role },
  });
});

export const updateUserProfileByUserId = dbAsyncHandler(
  async (id: string, data: UserProfile) => {
    return await db.userProfile.update({
      where: { userId: id },
      data,
    });
  }
);

export const createUserAddress = dbAsyncHandler(
  async (
    userId: string,
    data: Address,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    const saveAddress = await upsertAddress(data, prismaClient);

    await prismaClient.userAddressMapping.create({
      data: {
        userProfileId: userId,
        addressId: saveAddress.id,
      },
    });

    return saveAddress;
  }
);
