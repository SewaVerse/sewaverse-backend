import { NextResponse } from "next/server";

import { getStateProvinceById } from "@/app/data-access/stateProvince";
import ApiError from "@/app/utils/apiError";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

export const GET = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const state = await getStateProvinceById(id);

    if (!state) {
      throw new ApiError("State not found");
    }
    return NextResponse.json(
      { success: true, message: "State found", data: state },
      { status: 200 }
    );
  }
);
