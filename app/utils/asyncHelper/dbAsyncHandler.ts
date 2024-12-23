import { Prisma } from "@prisma/client";

/**
 * Wraps an asynchronous database function to catch and handle errors.
 * @param fn - The asynchronous database function to wrap.
 * @returns A wrapped function that handles errors.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbAsyncHandler<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: Args) => {
    try {
      return await fn(...args);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("db error", e.message);
      }
      throw e;
    }
  };
}
