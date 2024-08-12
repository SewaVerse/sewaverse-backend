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
  //fullname: string;
  profession: string[];
  dob: string;
  gender: string;
  //address: string;
}

export interface ICompany extends IUser {
  //companyName: string;
  registrationNumber: string;
  contactPersonName: string;
  contactPersonPosition: string;
  //companyAddress: string;
  secondaryContact?: string;
}
