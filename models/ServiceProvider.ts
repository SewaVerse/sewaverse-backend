import mongoose, { Schema } from "mongoose";
import UserModel from "./User";
import { IServiceProvider } from "../types/user";

const ServiceProviderSchema = new Schema<IServiceProvider>({
  // fullname: { type: String, required: true },
  profession: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  //address: { type: String, required: true },
});

const ServiceProviderModel =
  mongoose.models.ServiceProvider ||
  UserModel.discriminator<IServiceProvider>(
    "ServiceProvider",
    ServiceProviderSchema
  );

export default ServiceProviderModel;
