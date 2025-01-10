/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import ApiError from "../apiError";

/**
 * Async handler to catch errors in Next.js API routes.
 * @param {Function} fn - The asynchronous function to wrap.
 */
export function asyncHandler<Args extends any[]>(
  fn: (...args: Args) => Promise<NextResponse>
) {
  return async (...args: Args) => {
    try {
      return await fn(...args);
    } catch (error: any) {
      console.error("API Error:", error.message || error);
      if (error instanceof ApiError) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: error.code }
        );
      }
      return new NextResponse("Internal Server Error", {
        status: 500,
      });
    }
  };
}
