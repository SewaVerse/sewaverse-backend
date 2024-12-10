import { Prisma } from "@prisma/client";

/**
 * Wraps an asynchronous database function to catch and handle errors.
 * @param fn - The asynchronous database function to wrap.
 * @returns A wrapped function that handles errors.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbAsyncHandler<T>(fn: (...args: any[]) => Promise<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e.message);
      }
      throw e;
    }
  };
}
