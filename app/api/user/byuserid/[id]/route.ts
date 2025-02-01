import { NextResponse } from "next/server";

import { getUserProfileByUserId } from "@/app/data-access/user/userProfile";
import ApiError from "@/app/utils/apiError";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

export const GET = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const profile = await getUserProfileByUserId(id);

    if (!profile) {
      throw new ApiError("Profile not found");
    }
    return NextResponse.json(
      { success: true, message: "User Profile Fetched", data: profile },
      { status: 200 }
    );
  }
);
