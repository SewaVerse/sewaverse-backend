import { Schema, model, models } from "mongoose";

const userProfileSchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked user ID is required"],
    },
    name: { type: String, required: true },
    image: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    contact: { type: String },
    address: { type: String },
    gender: String,
    dob: String,
    isVerified: { type: Boolean, default: false },
    joinedDate: Date,
  },
  {
    strict: false,
  }
);

const UserProfile =
  models.UserProfile || model("UserProfile", userProfileSchema, "UserProfile");

export default UserProfile;
