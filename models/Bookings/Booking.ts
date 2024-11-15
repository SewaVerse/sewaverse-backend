import { bookingStatusTypes } from "@/lib/constants";
import { Schema, model, Model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    linkedServiceId: {
      type: Schema.Types.ObjectId,
      ref: "Services",
      required: [true, "Linked Service ID is required"],
    },
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked User ID is required"],
    },
    linkedServiceProviderId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked ServiceProvider ID is required"],
    },
    serviceName: {
      type: String,
    },
    selectedDate: {
      type: Date,
    },
    selectedTime: {
      type: String,
    },
    status: {
      type: String,
      enum: bookingStatusTypes,
      default: "Pending",
    },
    totalCost: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Bookings: Model<any>;
try {
  Bookings = models.Bookings || model("Bookings", BookingSchema, "Bookings");
} catch (error) {
  Bookings = model("Bookings", BookingSchema, "Bookings");
}

export default Bookings;
