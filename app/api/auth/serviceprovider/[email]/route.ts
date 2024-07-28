import connectMongo from "@/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import ServiceProvider from "@/models/ServiceProviderSchema";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email query parameter is required" },
      { status: 400 }
    );
  }
  try {
    await connectMongo();
    const lowerCaseEmail = email.toLowerCase();

    const serviceProviderUser = await ServiceProvider.findOne({
      email: lowerCaseEmail,
    });
    if (!serviceProviderUser) {
      console.log("User not found");
      return new NextResponse(
        JSON.stringify({ message: "User not found", status: 404 })
      );
    }
    console.log("User found", serviceProviderUser);
    return new NextResponse(
      JSON.stringify({
        message: "User found",
        status: 200,
        serviceProviderUser,
      })
    );
  } catch (error) {
    console.log("Error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error Occured", status: 500 })
    );
  }
}
