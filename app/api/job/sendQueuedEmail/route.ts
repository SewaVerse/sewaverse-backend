import { sendScheduleEmail } from "@/app/utils/schedule";
import { NextResponse } from "next/server";

export async function GET() {
  // Run the sendScheduleEmail function
  await sendScheduleEmail();

  const response = NextResponse.json({
    message: "send email job run successfully",
  });

  return response;
}
