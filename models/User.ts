import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    role: {
      type: String,
      required: true,
      enum: ["user", "service_provider", "company"],
    },
    isVerified: { type: Boolean, default: false },
    verifyCode: { type: String },
    verifyCodeExpiry: { type: Date },
    joinedDate: { type: Date },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
  },
  {
    strict: false,
  }
);

const UserModel = models.Users || model("Users", userSchema, "Users");

export default UserModel;
