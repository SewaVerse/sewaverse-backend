import { getAllUserByAdmin } from "@/app/data-access/admin";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { NextResponse } from "next/server";

export const GET = roleAsyncHandler("ADMIN", async (request: Request) => {
  console.log("Running GET request: Get all users");
  console.log(request.url);

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
