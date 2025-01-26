import { NextResponse } from "next/server";

import {
  createParentChildService,
  getServiceByName,
} from "@/app/data-access/service";
import {
  ParentChildServiceSchema,
  parentChildServiceSchema,
} from "@/app/schemas/serviceSchema";
import ApiError from "@/app/utils/apiError";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getCurrentUser } from "@/lib/auth";

export const POST = roleAsyncHandler(
  ["ADMIN", "SERVICE_PROVIDER"],
  async (req: Request) => {
    const user = await getCurrentUser();

    if (!user) throw new ApiError("User not found");

    const body = (await req.json()) as ParentChildServiceSchema;

    const [validationError, validatedFields] = validateRequestBody(
      parentChildServiceSchema,
      body
    );
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
    }

    const { parentServiceName, childServiceName } = validatedFields;

    // check if parent service already exists
    const findParentService = await getServiceByName(parentServiceName);

    if (findParentService) throw new ApiError("Service already exists");

    // check if child service already exists
    const findChildService = await getServiceByName(childServiceName);

    if (findChildService) throw new ApiError("Service already exists");

    const parentService = {
      name: parentServiceName,
      description: null,
      isActive: false,
      createdBy: user.id,
    };

    const childService = {
      name: childServiceName,
      description: null,
      isActive: false,
      createdBy: user.id,
    };

    const result = await createParentChildService(parentService, childService);

    return NextResponse.json(result, { status: 201 });
  }
);
