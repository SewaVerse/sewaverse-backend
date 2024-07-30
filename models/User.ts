import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/user";
import bcrypt from "bcrypt";

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
  otp: {
    code: String,
    expiresAt: Date,
  },
  joinedDate: { type: Date, default: Date.now },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

// Use a unique model name for the base User model
const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
