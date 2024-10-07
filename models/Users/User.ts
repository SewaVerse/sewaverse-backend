import { UserRole } from "@/schemas";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
    },
    userRole: {
      type: String,
      enum: UserRole,
      default: "USER",
    },
    isVerified: { type: Boolean, default: false },
    joinedDate: {
      type: Date,
      default: Date.now(),
    },
    verifyEmailToken: { type: String },
    verifyEmailTokenExpiry: { type: Date },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
  },
  {
    strict: false,
  }
);

const UserModel = models.Users || model("Users", userSchema, "Users");

export default UserModel;
