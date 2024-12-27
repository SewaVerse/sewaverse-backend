import { NextResponse } from "next/server";

import { getServiceProviderByUserId } from "@/app/data-access/serviceProvider";
import { getServiceProviderProfileById } from "@/app/data-access/serviceProviderProfile";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { currentUser } from "@/lib/auth";


export const GET = roleAsyncHandler("USER", async () => {
  console.error("Runing GET Request: Service Provider Details");

  const user = await currentUser();
  const existingServiceProvider = await getServiceProviderByUserId(user!.id!);

  const serviceProviderProfile = await getServiceProviderProfileById(
    existingServiceProvider!.profileId as string
  );

  return NextResponse.json(
    {
      success: true,
      message: "Service provider fetched successfully",
      data: { user, existingServiceProvider, serviceProviderProfile },
    },
    { status: 200 }
  );
});
