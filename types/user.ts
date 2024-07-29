import { Document } from "mongoose";
import { UserRole } from "./roles";

export interface IUser extends Document {
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  isVerified?: boolean;
  joinedDate?: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IServiceProvider extends IUser {
  fullname: string;
  profession: string;
  dob: string;
  gender: string;
  address: string;
  contact: string;
}

export interface ICompany extends IUser {
  companyName: string;
  registrationNumber: string;
  contactPersonName: string;
  contactPersonPosition: string;
  companyAddress: string;
  secondaryContact?: string;
}


