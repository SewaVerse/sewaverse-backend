import { getUserByEmail, updateUserById } from "@/app/data-access/user";
import {
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from "@/app/data-access/verificationToken";
import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = asyncHandler(
  async (
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    const token = (await params).slug;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Invalid verification token" },
        { status: 400 }
      );
    }

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return NextResponse.json(
        { success: false, message: "Invalid verification token" },
        { status: 400 }
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        { success: false, message: "Verification token has expired" },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    // update user
    await updateUserById(existingUser.id, {
      emailVerified: new Date(),
    } as User);

    await deleteVerificationTokenById(existingToken.id);

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  }
);
