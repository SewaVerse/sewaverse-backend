import { Model, Schema, model, models } from "mongoose";

const CompanySchema = new Schema(
  {
    linkedUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Linked user ID is required"],
    },
    name: { type: String, required: true },
    email: String,
    contact: String,
    address: String,
    registrationNumber: { type: String, required: true, unique: true },
    contactPersonName: { type: String, required: true },
    contactPersonPosition: { type: String, required: true },
    secondaryContact: { type: String },
    isVerified: { type: Boolean, default: false },
    joinedDate: Date,
  },
  {
    strict: false,
  }
);

let CompanyModel: Model<any>;

try {
  CompanyModel = models.Company || model("Company", CompanySchema, "Company");
} catch (error) {
  CompanyModel = model("Company", CompanySchema, "Company");
}

export default CompanyModel;
