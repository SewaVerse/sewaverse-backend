/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "register",
  "/auth/new-verification",
];

/**
 * An array of routes that are accessible to the private
 * These routes do require authentication
 * @type {string[]}
 */
export const PRIVATE_API_ROUTES = ["/api/user", "/api/admin"];

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_REDIRECT = "/";

export const ROOT = "/";

export const LOGIN = "/login";
