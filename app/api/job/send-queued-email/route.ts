import { NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { sendScheduleEmail } from "@/app/utils/schedule";

export const GET = asyncHandler(async () => {
  // Run the sendScheduleEmail function
  sendScheduleEmail();

  const response = NextResponse.json({
    message: "send email job run successfully",
  });

  return response;
});
