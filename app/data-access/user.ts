import { dbAsyncHandler } from "@/app/utils/dbAsyncHandler";
import db from "@/lib/db";
import { User, UserRoleMapping } from "@prisma/client";

export const getUserByEmail = dbAsyncHandler(async (email: string) => {
  return await db.user.findUnique({
    where: { email },
    include: { roles: true },
  });
});

export const getUserById = dbAsyncHandler(async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    include: {
      roles: true,
    },
  });
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

// role mapping
export const createUserRoleMapping = dbAsyncHandler(
  async (data: UserRoleMapping) => {
    return await db.userRoleMapping.create({
      data,
    });
  }
);
