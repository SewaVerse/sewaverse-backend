/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Async handler to catch errors in Next.js API routes.
 * @param {Function} fn - The asynchronous function to wrap.
 */
export function asyncHandler(
  fn: (req: Request, params: Params) => Promise<NextResponse>
) {
  return async (req: Request, params: Params) => {
    try {
      return await fn(req, params);
    } catch (error: any) {
      console.error("API Error:", error.message || error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  };
}
