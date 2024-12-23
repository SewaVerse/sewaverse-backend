import { User } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getUserByEmail, updateUserById } from "@/app/data-access/user";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

type LogoutRequest = {
  email: string;
};

export const POST = asyncHandler(async (request: Request) => {
  const headersList = await headers();
  const accessToken = headersList.get("Authorization")?.split("Bearer ")[1];

  if (!accessToken)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  const body = (await request.json()) as LogoutRequest;

  const { email } = body;

  if (!email)
    return NextResponse.json(
      { success: false, message: "Missing email" },
      {
        status: 400,
      }
    );

  const user = await getUserByEmail(email);

  if (!user || !user.id) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  if (accessToken !== user.accessToken)
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );

  // update user
  await updateUserById(user.id, { accessToken: null, expires: null } as User);

  return NextResponse.json({ success: true, message: "Logout successful" });
});
