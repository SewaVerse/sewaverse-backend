import mongoose, { Schema } from "mongoose";
import UserModel from "./User";
import { ICompany } from "../types/user";

const CompanySchema = new Schema<ICompany>({
  companyName: { type: String, required: true, unique: true },
  registrationNumber: { type: String, required: true, unique: true },
  contactPersonName: { type: String, required: true },
  contactPersonPosition: { type: String, required: true },
  companyAddress: { type: String, required: true },
  secondaryContact: { type: String },
});

// Ensure the name is unique and does not conflict with other discriminators
const CompanyModel =
  mongoose.models.Company ||
  UserModel.discriminator<ICompany>("Company", CompanySchema);

export default CompanyModel;
