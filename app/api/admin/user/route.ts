import { getAllUserByAdmin } from "@/app/data-access/admin";
import { asyncHandler } from "@/app/utils/asyncHandler";

import { NextResponse } from "next/server";

export const GET = asyncHandler(async () => {
  console.log("Running GET request: Get all users");

  const users = await getAllUserByAdmin();

  return NextResponse.json(
    {
      success: true,
      message: "Users fetched successfully",
      data: users,
    },
    { status: 200 }
  );
});
