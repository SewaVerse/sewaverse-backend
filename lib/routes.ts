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
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_REDIRECT = "/";

export const ROOT = "/";
