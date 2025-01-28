import { NextResponse } from "next/server";

import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";

export const GET = roleAsyncHandler("USER", async () => {
  console.error("Runing GET Request: Service Provider Details");

  // const user = await currentNextAuthUser();
  // const existingServiceProvider = await getServiceProviderByUserId(user!.id!);

  // const serviceProviderProfile = await getServiceProviderProfileById(
  //   existingServiceProvider!.profileId as string
  // );

  return NextResponse.json(
    {
      success: true,
      message: "Service provider fetched successfully",
    },
    { status: 200 }
  );
});
