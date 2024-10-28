import { UserRole } from "@/schemas";
import { Model, Schema, model, models } from "mongoose";

const UserSchema = new Schema(
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
    isProfileVerified: { type: Boolean, default: false },
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

let UserModel: Model<any>;

try {
  UserModel = models.Users || model("Users", UserSchema, "Users");
} catch (error) {
  UserModel = model("Users", UserSchema, "Users");
}

export default UserModel;
