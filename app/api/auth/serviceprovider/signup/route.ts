import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/connectMongo";
import ServiceProvider from "@/models/ServiceProviderSchema";
import { z } from "zod";

const serviceProviderSchema = z.object({
  fullname: z
    .string()
    .min(5, { message: "Minimum 5 characters" })
    .max(25, { message: "Exceeds 25 characters" }),
  profession: z.string({ message: "Invalid profession" }),
  dob: z.string({ message: "Invalid Date of birth" }),
  gender: z.string({ message: "invalid gender" }),
  address: z.string({ message: "invalid address" }),
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
    const {
      fullname,
      profession,
      dob,
      gender,
      address,
      email,
      password,
      contact,
    } = await request.json();

    // Validate input with Zod schema
    serviceProviderSchema.parse({
      fullname,
      profession,
      dob,
      gender,
      address,
      email,
      password,
      contact,
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
      email: email.toLowerCase(),
      password: hashedPassword,
      contact,
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
