import { Schema, model, models, Document } from "mongoose";

interface ICompany extends Document {
  companyName: string;
  registrationNumber: string;
  contactPersonName: string;
  contactPersonPosition: string;
  companyAddress: string;
  secondaryContact?: string;
  emailAddress: string;
  password: string;
}

const companySchema = new Schema<ICompany>(
  {
    companyName: {
      type: String,
      required: [true, "Company Name is required"],
      unique: true,
    },
    registrationNumber: {
      type: String,
      required: [true, "Registration Number is required"],
      unique: true,
    },
    contactPersonName: {
      type: String,
      required: [true, "Contact Person Name is required"],
    },
    contactPersonPosition: {
      type: String,
      required: [true, "Contact Person Position is required"],
    },
    companyAddress: {
      type: String,
      required: [true, "Company Address is required"],
    },
    secondaryContact: {
      type: String,
    },
    emailAddress: {
      type: String,
      required: [true, "Email Address is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { strict: false }
);

const Company = models.Company || model<ICompany>("Company", companySchema);

export default Company;
