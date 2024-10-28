import { Model, Schema, model, models } from "mongoose";

const UserProfileSchema = new Schema(
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

let UserProfile: Model<any>;

try {
  UserProfile =
    models.UserProfile ||
    model("UserProfile", UserProfileSchema, "UserProfile");
} catch (error) {
  UserProfile = model("UserProfile", UserProfileSchema, "UserProfile");
}

export default UserProfile;
