import { Schema, model, models, Document } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IServiceProvider extends Document {
  fullname: string;
  profession: string;
  dob: string;
  gender: string;
  address: string;
  contact: string;
  email: string;
  password: string;
  isVerified?: boolean;
  joinedDate?: Date;
  // forgotPasswordToken?: string;
  // forgotPasswordTokenExpiry?: Date;
  // verifyToken?: string;
  // verifyTokenExpiry?: Date;
  // deviceToken?: string;
}

// Create a Schema corresponding to the document interface.
const serviceProviderSchema = new Schema<IServiceProvider>(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },
    profession: {
      type: String,
      required: [true, "Profession is required"],
    },
    dob: {
      type: String,
      required: [true, "Date Of Birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    contact: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    // forgotPasswordToken: String,
    // forgotPasswordTokenExpiry: Date,
    // verifyToken: String,
    // verifyTokenExpiry: Date,
    // deviceToken: String,
  },
  { strict: false }
);

// Create a Model.
const ServiceProvider =
  models.ServiceProviderUsers ||
  model<IServiceProvider>("ServiceProviderUsers", serviceProviderSchema);

export default ServiceProvider;
