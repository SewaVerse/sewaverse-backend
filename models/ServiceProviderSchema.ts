import { Schema, model, models } from "mongoose";

const serviceProviderSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
      unique: false,
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    userType: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    // forgotPasswordToken: String,
    // forgotPasswordTokenExpiry: Date,
    // verifyToken: String,
    // verifyTokenExpiry: Date,
    // deviceToken: String,
  },
  { strict: false }
);

const ServiceProvider =
  models.ServiceProviderUsers ||
  model("ServiceProviderUsers", serviceProviderSchema, "ServiceProviderUsers");

export default ServiceProvider;
