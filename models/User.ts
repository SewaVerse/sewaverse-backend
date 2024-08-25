import { UserRole } from "@/schemas";
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
    },
    contact: { type: String },
    address: { type: String },
    userRole: {
      type: String,
      enum: UserRole,
      default: "USER",
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
