import { bookingStatusTypes } from "@/lib/constants";
import { Schema, model, Model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    linkedServiceId: {
      type: Schema.Types.ObjectId,
      ref: "Services",
    },
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    linkedServiceProviderId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    bookingDate: {
      type: Date,
    },
    bookingTime: {
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
    notes: {
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
