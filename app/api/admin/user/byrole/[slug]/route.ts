import { findUsersByRole } from "@/app/data-access/user";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    const roleParam = (await params).slug;

    if (!roleParam) {
      return NextResponse.json(
        { success: false, message: "Role is required" },
        { status: 400 }
      );
    }

    if (!Object.values(Role).includes(roleParam as Role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role specified" },
        { status: 400 }
      );
    }

    const role = roleParam as Role;

    const users = await findUsersByRole(role);

    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, message: "No users found with the specified role" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: users });
  }
);
