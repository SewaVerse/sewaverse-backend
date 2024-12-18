import { asyncHandler } from "@/app/utils/asyncHandler";
import { getLocalFileUrl } from "@/app/utils/fileHelper";
import { NextResponse } from "next/server";

export const GET = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    const id = (await params).slug;

    const fileUrl = await getLocalFileUrl(id);

    return NextResponse.json({ sucess: true, fileUrl });
  }
);
