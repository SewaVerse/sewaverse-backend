/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

/**
 * Async handler to catch errors in Next.js API routes.
 * @param {Function} fn - The asynchronous function to wrap.
 */
export function asyncHandler(
  fn: (
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => Promise<NextResponse>
) {
  return async (
    req: Request,
    parmas: { params: Promise<{ slug: string }> }
  ) => {
    try {
      return await fn(req, parmas);
    } catch (error: any) {
      console.error("API Error:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  };
}
