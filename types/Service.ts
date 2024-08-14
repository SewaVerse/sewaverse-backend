import { Document } from "mongoose";

// export enum PricingType {
//   PER_UNIT = "Per Unit",
//   PER_HOUR = "Per Hour",
//   PER_DAY = "Per Day",
//   FLAT_RATE = "Flat Rate",
//   OTHER = "",
// }

export enum Status {
  AVAILABLE = "Available",
  NOTAVALIABLE = "Not Available",
}

export interface IService extends Document {
  serviceName: string;
  description: string;
  serviceCategory: string;
  pricingType: string;
  price: string;
  location: string;
  image: string;
  userId: string;
  userName: string;
  userRole: string;
  status: string;
  isVerifiedByAdmin: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
