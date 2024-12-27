import { getAllServiceProviderProfileByAdmin } from "@/app/data-access/admin";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { NextResponse } from "next/server";

export const GET = roleAsyncHandler("ADMIN", async () => {
  console.error("Runing GET Request: Service Provider Details");

  const serviceProviderProfile = await getAllServiceProviderProfileByAdmin();

  return NextResponse.json(
    {
      success: true,
      message: "Service provider fetched successfully",
      data: { serviceProviderProfile },
    },
    { status: 200 }
  );
});
