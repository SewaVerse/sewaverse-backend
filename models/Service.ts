import { IService } from "@/types/Service";
import mongoose, { Schema } from "mongoose";

const ServiceSchema: Schema<IService> = new Schema<IService>(
  {
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    pricingType: {
      type: String,
      // enum: Object.values(PricingType),
      required: true,
    },
    price: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: String },
    userName: { type: String },
    userRole: { type: String },
    // status: {
    //   type: String,
    //   enum: Object.values(Status),
    //   required: true,
    // },
    isVerifiedByAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    strict: false,
  }
);

// Create the model
const ServiceModel =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default ServiceModel;
