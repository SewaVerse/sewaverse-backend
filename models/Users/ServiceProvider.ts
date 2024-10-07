import { Schema, models, model } from "mongoose";

const ServiceProviderSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked user ID is required"],
    },
    name: { type: String, required: true },
    image:String,
    email: String,
    contact: String,
    address: String,
    isVerified: { type: Boolean, default: false },
    profession: {
      type: [String],
      required: true,
    },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    isProfileVerified: { type: Boolean, default: false },
    joinedDate: Date,
  },
  {
    strict: false,
  }
);

const ServiceProviderModel =
  models.ServiceProvider ||
  model("ServiceProvider", ServiceProviderSchema, "ServiceProvider");

export default ServiceProviderModel;
