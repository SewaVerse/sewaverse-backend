import { getAllUserByAdmin } from "@/app/data-access/admin";
import { currentRoles } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("Running GET request: Get all users");

  //const role = await currentRoles();

  const role = ["ADMIN"];

  try {
    if (!role || role.length === 0) {
      return NextResponse.json(
        { success: false, message: "No role found" },
        { status: 500 }
      );
    }

    if (role.includes("ADMIN")) {
      const users = await getAllUserByAdmin();

      return NextResponse.json(
        {
          success: true,
          message: "Users fetched successfully",
          data: users,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Access denied: Not an admin" },
        { status: 403 }
      );
    }
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Error getting users" },
      { status: 500 }
    );
  }
};
