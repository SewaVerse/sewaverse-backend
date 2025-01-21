import { NextResponse } from "next/server";

import {
  createBooking,
  getAllBookingsByUserId,
} from "@/app/data-access/booking";
import { getOfferedService } from "@/app/data-access/offeredService";
import { bookingSchema, BookingSchema } from "@/app/schemas/bookingSchema";
import ApiError from "@/app/utils/apiError";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { bookingStatusMap } from "@/app/utils/enumMap";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { getCurrentUser } from "@/lib/auth";

export const POST = roleAsyncHandler("USER", async (request: Request) => {
  const body = await request.json();

  const transformBody = {
    ...body,
    bookingDate: new Date(body.bookingDate),
  } as BookingSchema;

  const [validationError, validatedFields] = validateRequestBody(
    bookingSchema,
    transformBody
  );
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 }); // If there's an error, return it directly
  }

  const user = await getCurrentUser();

  if (!user) throw new ApiError("User not found");

  // check valid offered service
  const offeredService = await getOfferedService(
    validatedFields.offeredServiceId
  );

  if (!offeredService) throw new ApiError("Offered service not found");

  const saveBooking = {
    ...validatedFields,
    status:
      bookingStatusMap[validatedFields.status as keyof typeof bookingStatusMap],
    userId: user.id,
  };

  const result = await createBooking(saveBooking);

  return NextResponse.json(
    { success: true, message: "Booking created successfully", data: result },
    { status: 201 }
  );
});

export const GET = roleAsyncHandler(["USER"], async () => {
  const user = await getCurrentUser();

  if (!user) throw new ApiError("User not found");

  const data = await getAllBookingsByUserId(user.id);

  return NextResponse.json({
    success: true,
    message: "All user bookings fetched!!",
    data,
  });
});
