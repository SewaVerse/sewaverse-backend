import { WorkExperienceSchema } from "../Users/ServiceProvider";
import { Schema, models, model, Model } from "mongoose";

const serviceSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked user ID is required"],
    },
    serviceName: { type: String },
    serviceCategory: { type: String },
    description: { type: String },
    price: { type: String },
    discount: String,
    location: { type: [String] },
    image: { type: String, reuired: true },
    time: String,
    workExperience: {
      type: [WorkExperienceSchema],
      //required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
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
