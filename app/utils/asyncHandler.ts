import { NextResponse } from "next/server";

/**
 * Async handler to catch errors in Next.js API routes.
 * @param {Function} fn - The asynchronous function to wrap.
 */
export function asyncHandler(fn: (req: Request) => Promise<NextResponse>) {
  return async (req: Request) => {
    try {
      return await fn(req);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("API Error:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  };
}
