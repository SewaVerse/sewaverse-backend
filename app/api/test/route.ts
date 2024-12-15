import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("hi");
  console.log(process.env.AUTH_SECRET);
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log("JSON Web Token", token);

  return NextResponse.json({ token });
}
