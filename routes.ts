/**
 * Array of routes accessible to public
 * These routes do not require authentication
 * @types {string[]}
 */
export const publicRoutes = ["/", "/verify"];

export const authRoutes = ["/auth/login", "/auth/signup"];

export const apiAuthPrefix = "/api";

export const DEFAULT_LOGIN_REDIRECT = "/settings";