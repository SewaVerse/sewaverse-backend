import { NextResponse } from "next/server";

import { getServiceProviderProfileById } from "@/app/data-access/serviceProviderProfile";
import ApiError from "@/app/utils/apiError";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

export const GET = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const profile = await getServiceProviderProfileById(id);

    if (!profile) {
      throw new ApiError("State not found");
    }
    return NextResponse.json(
      { success: true, message: "Profile found", data: profile },
      { status: 200 }
    );
  }
);
