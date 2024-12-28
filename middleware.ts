import { headers } from "next/headers";
import { NextResponse } from "next/server";

import {
  DEFAULT_REDIRECT,
  LOGIN,
  PRIVATE_API_ROUTES,
  PUBLIC_ROUTES,
  ROOT,
} from "@/lib/routes";

import { decodeToken } from "./app/utils/token";
import { auth } from "./auth";

const handleApiRoute = (
  nextUrl: { pathname: string },
  isAuthenticated: boolean
) => {
  if (
    PRIVATE_API_ROUTES.some((route) => nextUrl.pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    // If not authenticated, return a 401 Unauthorized response
    return new NextResponse("Unauthorized from middleware", {
      status: 401,
    });
  }

  return NextResponse.next();
};

export default auth(async (req) => {
  const { nextUrl } = req;

  const auth = !!req.auth;

  // Handle API routes
  if (nextUrl.pathname.startsWith("/api")) {
    const headerList = await headers();
    const accessToken = headerList.get("Authorization")?.split("Bearer ")[1];

    let tokenPayload = null;

    // speciallly for mobile
    if (accessToken) {
      tokenPayload = await decodeToken(accessToken);
    }

    const isAuthenticated = !!auth || !!tokenPayload;

    return handleApiRoute(nextUrl, isAuthenticated);
  }

  // root is accessible to everyone
  if (nextUrl.pathname === ROOT) return NextResponse.next();

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // If the user is authenticated and the route is public, redirect to the default route
  if (isPublicRoute && auth)
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  // If the user is not authenticated and the route is not public, redirect to the login page
  if (!auth && !isPublicRoute)
    return Response.redirect(new URL(LOGIN, nextUrl));
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - file extension
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - images
     */
    "/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
