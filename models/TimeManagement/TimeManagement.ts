import { Schema, model, Document, Types, Model, models } from "mongoose";


// Define the slot schema with status
const slotSchema = new Schema(
  {
    startTime: {
      type: String, // You can use Date if you need more precise control
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "booked", "unavailable"], // Adjust status options as needed
      required: true,
    },
  },
  { _id: false }
);

// Define the TimeManagement schema  
interface ITimeManagement extends Document {
  linkedServiceProviderId: Types.ObjectId;
  morningSlots: Array<{ startTime: string; endTime: string; status: string }>;
  afternoonSlots: Array<{ startTime: string; endTime: string; status: string }>;
  eveningSlots: Array<{ startTime: string; endTime: string; status: string }>;
}

const timeManagementSchema = new Schema<ITimeManagement>(
  {
    linkedServiceProviderId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked ServiceProvider ID is required"],
    },
    morningSlots: {
      type: [slotSchema],
      default: [],
    },
    afternoonSlots: {
      type: [slotSchema],
      default: [],
    },
    eveningSlots: {
      type: [slotSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

let TimeManagement: Model<any>;
try {
  TimeManagement = models.TimeManagement || model("TimeManagement", timeManagementSchema, "TimeManagement");
} catch (error) {
  TimeManagement = model("TimeManagement", timeManagementSchema, "TimeManagement");
}

export default TimeManagement;


