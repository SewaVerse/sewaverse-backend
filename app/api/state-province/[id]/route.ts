import { NextResponse } from "next/server";

import { getStateProvinceById } from "@/app/data-access/stateProvince";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import CustomError from "@/app/utils/customError";

export const GET = asyncHandler(
  async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const state = await getStateProvinceById(id);

    if (!state) {
      throw new CustomError("State not found");
    }
    return NextResponse.json(
      { success: true, message: "State found", data: state },
      { status: 200 }
    );
  }
);
