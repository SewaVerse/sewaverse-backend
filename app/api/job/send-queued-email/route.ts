import { asyncHandler } from "@/app/utils/asyncHandler";
import { sendScheduleEmail } from "@/app/utils/schedule";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async () => {
  // Run the sendScheduleEmail function
  await sendScheduleEmail();

  const response = NextResponse.json({
    message: "send email job run successfully",
  });

  return response;
});
