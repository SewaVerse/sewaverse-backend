import { User } from "@prisma/client";
import { NextResponse } from "next/server";

import { getUserByEmail, updateUserById } from "@/app/data-access/user";
import ApiError from "@/app/utils/apiError";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { getcurrentUser } from "@/lib/auth";

export const POST = asyncHandler(async () => {
  const sessionUser = await getcurrentUser();

  if (!sessionUser) throw new ApiError("Invalid token", 401);

  const { email, accessToken } = sessionUser;

  if (!email) throw new ApiError("Invalid token", 401);

  const user = await getUserByEmail(email);

  if (!user || !user.id) throw new ApiError("Invalid token", 401);

  if (accessToken !== user.accessToken)
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );

  // update user
  await updateUserById(user.id, { accessToken: null, expires: null } as User);

  return NextResponse.json({ success: true, message: "Logout successful" });
});
