import { NextResponse } from "next/server";

import { createService, updateServiceById } from "@/app/data-access/service";
import { serviceSchema } from "@/app/schemas/serviceSchema";
import ApiError from "@/app/utils/apiError";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getCurrentUser } from "@/lib/auth";

export const POST = roleAsyncHandler(
  ["ADMIN", "SERVICE_PROVIDER"],
  async (request: Request) => {
    const user = await getCurrentUser();

    if (!user) throw new ApiError("User not found", 404);

    const formData = await request.formData();

    const id = formData.get("id")?.toString() || null;
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || null;
    const parentServiceId = formData.get("parentServiceId")?.toString() || null;
    const isActive = formData.get("isActive")?.toString() === "true";
    // const inputFile = formData.get("file") as File;

    const [validationError, validatedFields] = validateRequestBody(
      serviceSchema,
      {
        id: id ?? "",
        name,
        description: description ?? undefined,
        parentServiceId: parentServiceId ?? undefined,
        isActive,
      }
    );

    if (validationError) {
      return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
    }

    // const { file } = validatedFields;

    if (validatedFields.id) {
      const { id, ...rest } = validatedFields;
      const service = await updateServiceById(id, rest);

      return NextResponse.json({
        success: true,
        message: "Service updated successfully",
        data: service,
      });
    }

    const service = await createService({
      ...validatedFields,
      createdBy: user?.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: service,
      },
      { status: 201 }
    );
  }
);
