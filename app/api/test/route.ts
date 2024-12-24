import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  console.error("hi");
  console.error(process.env.AUTH_SECRET);
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.error("JSON Web Token", token);

  return NextResponse.json({ token });
}
