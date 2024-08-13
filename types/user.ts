import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: string;
  contact: string;
  address: string;
  isVerified?: boolean;
  joinedDate?: Date;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
}

export interface IServiceProvider extends IUser {
  profession: string[];
  dob: string;
  gender: string;
}

export interface ICompany extends IUser {
  registrationNumber: string;
  contactPersonName: string;
  contactPersonPosition: string;

  secondaryContact?: string;
}
