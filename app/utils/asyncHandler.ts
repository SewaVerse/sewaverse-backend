/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import CustomError from "./customError";

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
      if (error instanceof CustomError) {
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
