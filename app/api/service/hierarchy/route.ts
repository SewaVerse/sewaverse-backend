import { NextResponse } from "next/server";

import { getServicesHierarchy } from "@/app/data-access/service";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";

export const GET = roleAsyncHandler(["ADMIN", "SERVICE_PROVIDER"], async () => {
  const data = await getServicesHierarchy();
  return NextResponse.json(
    {
      success: true,
      message: "Service hierarchy fetched successfully",
      data,
    },
    { status: 200 }
  );
});
