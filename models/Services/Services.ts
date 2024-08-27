import { Schema, models, model } from "mongoose";

const serviceSchema = new Schema(
  {
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    pricingType: {
      type: String,
      required: true,
    },
    price: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: String },
    userName: { type: String },
    userRole: { type: String },
    isVerifiedByAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    strict: false,
  }
);

const ServiceModel =
  models.Services || model("Services", serviceSchema, "Services");

export default ServiceModel;
