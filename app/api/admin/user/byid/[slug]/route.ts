import { getUserById } from "@/app/data-access/user";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { NextResponse } from "next/server";

export const GET = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    console.log("Running GET request: Get user by id by ADMIN");
    const userId = (await params).slug;
    // const userId = "675953f9eff1c56b6fd1fc50";

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User found",
      data: user,
    });
  }
);
