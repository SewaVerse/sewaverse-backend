import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["user", "service_provider", "company"],
  },
  isVerified: { type: Boolean, default: false },
  verifyCode: { type: String },
  verifyCodeExpiry: { type: Date },
  joinedDate: { type: Date, default: Date.now },
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
});


// Use a unique model name for the base User model
const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
