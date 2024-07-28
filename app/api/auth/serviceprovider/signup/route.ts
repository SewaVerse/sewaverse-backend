import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/connectMongo";
import ServiceProvider from "@/models/ServiceProviderSchema";
import { z } from "zod";
import { serviceProviderSchema } from "@/schema/index";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  console.log("Running POST request: Add User");
  const msg_success = "Successfully added user";
  const msg_invalidUser = "User already exists";

  try {
    const {
      fullname,
      profession,
      dob,
      gender,
      address,
      contact,
      email,
      password,
    } = await request.json();

    // Validate input with Zod schema
    serviceProviderSchema.parse({
      fullname,
      profession,
      dob,
      gender,
      address,
      contact,
      email,
      password,
    });

    await connectMongo();
    console.log("MongoDB Connected");
    const lowerCaseEmail = email.toLowerCase();

    const existingUser = await ServiceProvider.findOne({
      email: lowerCaseEmail,
    });
    if (existingUser) {
      if (existingUser.email) {
        console.error(msg_invalidUser);
        return new NextResponse(JSON.stringify({ message: msg_invalidUser }));
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new ServiceProvider({
      fullname,
      dob,
      gender,
      profession,
      address,
      contact,
      email: lowerCaseEmail,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return new NextResponse(
      JSON.stringify({ status: "201", message: msg_success })
    );
  } catch (error: any) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: error.errors }), {
        status: 500,
      });
    }

    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 500,
    });
  }
}
