import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/connectMongo";
import Company from "@/models/CompanyServiceSchema";
import { z } from "zod";

const companySchema = z.object({
  companyName: z.string().min(5, { message: "Company Name is required" }),
  registrationNumber: z
    .string()
    .min(1, { message: "Registration Number is required" }),
  contactPersonName: z
    .string()
    .min(1, { message: "Contact Person Name is required" }),
  contactPersonPosition: z
    .string()
    .min(1, { message: "Contact Person Position is required" }),
  companyAddress: z.string().min(1, { message: "Company Address is required" }),
  secondaryContact: z.string().optional(), // Optional field
  emailAddress: z.string().email({ message: "Invalid email address" }),
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
      companyName,
      registrationNumber,
      contactPersonName,
      contactPersonPosition,
      companyAddress,
      secondaryContact,
      emailAddress,
      password,
    } = await request.json();

    // Validate input with Zod schema
    companySchema.parse({
      companyName,
      registrationNumber,
      contactPersonName,
      contactPersonPosition,
      companyAddress,
      secondaryContact,
      emailAddress,
      password,
    });

    await connectMongo();
    console.log("MongoDB Connected");
    const lowerCaseEmail = emailAddress.toLowerCase();

    const existingUser = await Company.findOne({
      email: lowerCaseEmail,
    });
    if (existingUser) {
      if (existingUser.email) {
        console.error(msg_invalidUser);
        return new NextResponse(JSON.stringify({ message: msg_invalidUser }));
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Company({
      companyName,
      registrationNumber,
      contactPersonName,
      contactPersonPosition,
      companyAddress,
      secondaryContact,
      emailAddress: emailAddress.toLowerCase(),
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
