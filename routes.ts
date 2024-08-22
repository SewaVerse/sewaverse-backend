/**
 * Array of routes accessible to public
 * These routes do not require authentication
 * @types {string[]}
 */
export const publicRoutes = ["/"];

export const authRoutes = ["/auth/login", "/auth/signup"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
