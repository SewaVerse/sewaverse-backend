import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked user ID is required"],
    },
    name: { type: String, required: true },
    email: String,
    password: String,
    contact: String,
    address: String,
    isVerified: { type: Boolean, default: false },
    registrationNumber: { type: String, required: true, unique: true },
    contactPersonName: { type: String, required: true },
    contactPersonPosition: { type: String, required: true },
    secondaryContact: { type: String },
    profileStatus: { type: Boolean, default: false },
    joinedDate: Date,
  },
  {
    strict: false,
  }
);

const CompanyModel =
  models.Company || model("Company", CompanySchema, "Company");

export default CompanyModel;
