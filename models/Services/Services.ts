import { Schema, models, model, Model } from "mongoose";

const serviceSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked user ID is required"],
    },
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    pricingType: {
      type: String,
      required: true,
    },
    price: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: [String], required: true },
    isVerifiedByAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    strict: false,
  }
);

let Services: Model<any>;
try {
  Services = models.Services || model("Services", serviceSchema, "Services");
} catch (error) {
  Services = model("Services", serviceSchema, "Services");
}

export default Services;
