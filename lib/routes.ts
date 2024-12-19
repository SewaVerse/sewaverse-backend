/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgotPassword",
  "/resetPassword",
  "/resetPasswordSucess",
   "/accountType",
   "/sewaprovider",
   "/sewaproviderwelcome",
];

/**
 * An array of api routes that are accessible to the private
 * These routes do require authentication
 */
export const PRIVATE_API_ROUTES = ["/api/user", "/api/admin"];

/**
 * The default redirect path after loggin in
 */
export const DEFAULT_REDIRECT = "/";

export const ROOT = "/";
export const EMAIL = "/email";

export const LOGIN = "/login";
