/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  DEFAULT_REDIRECT,
  LOGIN,
  PRIVATE_API_ROUTES,
  PUBLIC_ROUTES,
  ROOT,
} from "@/lib/routes";
import { NextResponse } from "next/server";
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

  return null;
};

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  // Handle API routes
  if (nextUrl.pathname.startsWith("/api"))
    return handleApiRoute(nextUrl, isAuthenticated);

  // root is accessible to everyone
  if (nextUrl.pathname === ROOT) return NextResponse.next();

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // If the user is authenticated and the route is public, redirect to the default route
  if (isPublicRoute && isAuthenticated)
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  // If the user is not authenticated and the route is not public, redirect to the login page
  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(LOGIN, nextUrl));

  return NextResponse.next();
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
