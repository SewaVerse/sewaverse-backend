import { Schema, models, model, Model } from "mongoose";

export const WorkExperienceSchema = new Schema(
  {
    subCategory: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ServiceProviderSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked user ID is required"],
    },
    name: { type: String, required: true },
    image: String,
    email: String,
    contact: String,
    address: String,
    isVerified: { type: Boolean, default: false },
    serviceCategory: {
      type: String,
      required: true,
    },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    workExperience: {
      type: [WorkExperienceSchema],
      required: true,
    },
    joinedDate: Date,
  },
  {
    strict: false,
  }
);

let ServiceProviderModel: Model<any>;

try {
  ServiceProviderModel =
    models.ServiceProvider ||
    model("ServiceProvider", ServiceProviderSchema, "ServiceProvider");
} catch (error) {
  ServiceProviderModel = model(
    "ServiceProvider",
    ServiceProviderSchema,
    "ServiceProvider"
  );
}

export default ServiceProviderModel;
