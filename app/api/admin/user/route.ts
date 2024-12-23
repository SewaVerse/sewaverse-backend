import { NextResponse } from "next/server";

import { getAllUserByAdmin } from "@/app/data-access/admin";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";

export const GET = roleAsyncHandler("ADMIN", async (request: Request) => {
  console.error("Running GET request: Get all users");
  console.error(request.url);

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
