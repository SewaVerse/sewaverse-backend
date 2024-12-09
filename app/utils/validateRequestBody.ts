import { NextResponse } from "next/server"; // Assuming NextResponse is being used from Next.js
import { z } from "zod";

export const validateRequestBody = <T>(schema: z.ZodSchema<T>, body: T) => {
  try {
    schema.parse(body); // Validate the request body
    return null; // No errors, return null
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format validation errors into an object with field names and custom messages
      const invalidFields = error.errors.reduce((acc, curr) => {
        const fieldName = curr.path.join("."); // Get field name path
        const errorMessage = curr.message; // Custom error message from schema
        acc[fieldName] = errorMessage; // Add to result
        return acc;
      }, {} as Record<string, string>);

      // Return a detailed error response with the invalid fields and status 400 as JSON
      return new NextResponse(
        JSON.stringify({ message: "Invalid input", fields: invalidFields }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return a generic error response if it's not a ZodError
    console.error(error); // Log the error for debugging
    return new NextResponse(
      JSON.stringify({ message: "Unknown error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
