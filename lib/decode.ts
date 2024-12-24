import jwt from "jsonwebtoken";

export const decodedToken = (authHeader: string) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "No or invalid token provided",
      }),
      { status: 401 }
    );
  }
  const token = authHeader!.split(" ")[1];
  return jwt.verify(token, process.env.AUTH_SECRET!);
};
