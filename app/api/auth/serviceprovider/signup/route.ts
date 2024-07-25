import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/connectMongo";
import ServiceProvider from "@/models/ServiceProviderSchema";
import { z } from "zod";
import jwt from "jsonwebtoken";

const signupSchema = z.object({
  fullname: z
    .string()
    .min(5, { message: "Minimum 5 characters" })
    .max(25, { message: "Exceeds 25 characters" }),
  address: z.string(),
  contact: z.string().min(10, { message: "Must be a valid mobile number" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  console.log("Running POST request: Add User");
  const msg_success = "Successfully added user";
  const msg_invalidUser = "User already exists";

  try {
    const { fullname, contact, address, email, password } =
      await request.json();

    // Validate input with Zod schema
    signupSchema.parse({ fullname, contact, address, email, password });

    await connectMongo();
    const lowerCaseEmail = email.toLowerCase();

    const existingUser = await ServiceProvider.findOne({
      $or: [{ email: lowerCaseEmail }, { contact }],
    });
    if (existingUser) {
      if (
        existingUser.email === lowerCaseEmail ||
        existingUser.contact === contact
      ) {
        console.error(msg_invalidUser);
        return new NextResponse(JSON.stringify({ message: msg_invalidUser }));
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new ServiceProvider({
      fullname,
      contact,
      address,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return new NextResponse(
      JSON.stringify({ status: "201", message: msg_success, savedUser })
    );
  } catch (error: any) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: error.errors }), {
        status: 400,
      });
    }

    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }
}
