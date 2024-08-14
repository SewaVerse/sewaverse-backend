import mongoose, { Schema } from "mongoose";
import UserModel from "./User";
import { IServiceProvider } from "../types/user";

const ServiceProviderSchema = new Schema<IServiceProvider>(
  {
    profession: {
      type: [String],
      required: true,
    },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
  },
  {
    strict: false,
  }
);

const ServiceProviderModel =
  mongoose.models.ServiceProvider ||
  UserModel.discriminator<IServiceProvider>(
    "ServiceProvider",
    ServiceProviderSchema
  );

export default ServiceProviderModel;
