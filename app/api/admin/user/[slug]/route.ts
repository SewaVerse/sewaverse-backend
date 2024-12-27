import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { findUsersByRole, getUserById } from "@/app/data-access/user";
import { mongoId } from "@/lib/constants";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";

export const GET = roleAsyncHandler("ADMIN",
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    console.error("Running GET request: Get data by ADMIN");
    const slug = (await params).slug;

    const isMongoId = mongoId(slug);
    // console.error("Slug received:", slug, "Is MongoDB ObjectId?", isMongoId);

    if (isMongoId) {
      const user = await getUserById(slug);

      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found by ID" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "User found by ID",
        data: user,
      });
    }

    // Check if the `slug` is a valid role
    if (Object.values(Role).includes(slug as Role)) {
      // console.error("Role executed");
      const users = await findUsersByRole(slug as Role);

      if (!users) {
        return NextResponse.json(
          { success: false, message: "No user found by role" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Users found by role: ${slug}`,
        data: users,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid ID or role" },
      { status: 400 }
    );
  }
);
