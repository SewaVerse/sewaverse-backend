// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface NextAuthRequest extends NextRequest {
  auth: {
    roles: Role[]; // Define the actual shape of your auth object
  };
}

/**
 * A higher-order function that wraps an async handler in Next.js API routes to handle
 * role-based access control and error management.
 *
 * It checks if the user has the required role and catches any errors during execution.
 *
 * @param role - The role required to access the API route.
 * @param  fn - The asynchronous handler function that should be wrapped.
 * @returns  A new function that checks the user's role, handles errors,
 * and returns an appropriate response.
 */
const roleAsyncHandler = <Args extends unknown[]>(
  role: Role, // Add `role` as a parameter to the wrapper
  fn: (request: NextRequest, ...args: Args) => Promise<NextResponse>
) => {
  return auth(async (request: NextAuthRequest, ...args: Args) => {
    try {
      const authRoles = request?.auth?.user?.roles;

      if (!authRoles || !Array.isArray(authRoles)) {
        return new NextResponse(
          "User roles are not defined or invalid. Unauthorized access.",
          { status: 401 }
        );
      }

      if (!authRoles.includes(role)) {
        return new NextResponse(
          `Access denied. The user does not have the required '${role}' role.`,
          { status: 403 }
        );
      }

      return await fn(request, ...args);
    } catch (error) {
      console.error(
        "RBAC API Error:",
        error instanceof Error ? error.message : String(error)
      );
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  });
};

export default roleAsyncHandler;
