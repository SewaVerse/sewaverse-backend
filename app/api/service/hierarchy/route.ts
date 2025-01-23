import { NextResponse } from "next/server";

import { getServicesHierarchyByUserId } from "@/app/data-access/service";
import ApiError from "@/app/utils/apiError";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { getCurrentUser } from "@/lib/auth";

export const GET = roleAsyncHandler(["ADMIN", "SERVICE_PROVIDER"], async () => {
  const user = await getCurrentUser();

  if (!user) throw new ApiError("User not found", 404);

  const data = await getServicesHierarchyByUserId(user.id);
  return NextResponse.json(
    {
      success: true,
      message: "Service hierarchy fetched successfully",
      data,
    },
    { status: 200 }
  );
});
