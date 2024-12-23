import { z } from "zod";
import { ZodError } from "zod";

type ValidationErrorResponse = {
  message: string;
  fields?: Record<string, string>;
};

type ValidationResult<T> = [ValidationErrorResponse, null] | [null, T];

export const validateRequestBody = <T>(
  schema: z.ZodSchema<T>,
  body: T
): ValidationResult<T> => {
  try {
    // Attempt to validate the body using the provided schema
    const parsedData = schema.parse(body); // Zod's parse will throw if validation fails
    return [null, parsedData]; // No errors, return the parsed data
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle Zod-specific validation errors
      const invalidFields = error.errors.reduce((acc, curr) => {
        const fieldName = curr.path.join("."); // Convert path array into dot notation string (e.g., "address.street")
        const errorMessage = curr.message; // Zod error message
        acc[fieldName] = errorMessage; // Add to the accumulator object
        return acc;
      }, {} as Record<string, string>);

      // Return a detailed error response
      return [
        {
          message:
            Object.keys(invalidFields).length > 1
              ? "Invalid inputs"
              : "Invalid input",
          fields: invalidFields, // Return a map of invalid fields and messages
        },
        null,
      ];
    }

    // Log the error for debugging if it's not a ZodError
    console.error("Unexpected error:", error);

    // Return a generic error response for non-Zod errors
    return [
      {
        message: "Unknown error occurred",
      },
      null,
    ];
  }
};
