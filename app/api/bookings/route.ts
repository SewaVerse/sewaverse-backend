import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Bookings from "@/models/Bookings/Booking";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST Request: Book Service");
  try {
    const data = await request.json();
    console.log("Booking data received:", data);

    //const role = await currentRole();
    const role = "USER";
    await connectMongo();

    if (role !== "USER") {
      return NextResponse.json(
        { success: false, message: "Only users can make bookings" },
        { status: 403 }
      );
    }

    const newBooking = new Bookings({
      linkedServiceId: data.linkedServiceId,
      linkedUserId: data.linkedUserId,
      linkedServiceProviderId: data.linkedServiceProviderId,
      serviceName: data.serviceName,
      selectedDate: data.selectedDate,
      selectedTime: data.selectedTime,
      status: data.status || "Pending",
      location: data.location,
      totalCost: data.totalCost,
    });

    await newBooking.save();

    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
