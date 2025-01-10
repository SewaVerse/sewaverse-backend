import { NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { getCurrentUser } from "@/lib/auth";

export const GET = asyncHandler(async (request: Request) => {
  console.warn(request.url);

  const user = await getCurrentUser();
  console.warn(user);

  return NextResponse.json({
    success: true,
    message: "User session fetched",
    data: user,
  });
});
