/**
 * Array of routes accessible to public
 * These routes do not require authentication
 * @types {string[]}
 */
export const publicRoutes = ["/", "/verify ", "/resetpassword"];

export const authRoutes = ["/login", "/signup"];

export const apiAuthPrefix = "/api";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
