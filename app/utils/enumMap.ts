import {
  BookingStatus,
  Gender,
  MunicipalityType,
  PriceType,
  VerificationDocumentType,
} from "@prisma/client";

export const genderTypes = ["male", "female", "others"] as const;

export const genderTypeMap: Record<(typeof genderTypes)[number], Gender> = {
  male: "MALE",
  female: "FEMALE",
  others: "OTHERS",
};

export const priceTypes = [
  "hourly",
  "task",
  "session",
  "unit",
  "project",
] as const;

export const priceTypeMap: Record<(typeof priceTypes)[number], PriceType> = {
  hourly: "HOURLY",
  task: "TASK",
  session: "SESSION",
  unit: "UNIT",
  project: "PROJECT",
};

export const bookingStatus = [
  "pending",
  "confirmed",
  "completed",
  "canceled",
] as const;

export const bookingStatusMap: Record<
  (typeof bookingStatus)[number],
  BookingStatus
> = {
  pending: "PENDING",
  confirmed: "CONFIRMED",
  completed: "COMPLETED",
  canceled: "CANCELED",
};

export const verificationDocumentTypes = [
  "citizenship",
  "nationalcard",
  "drivinglicense",
  "pan_vat",
  "certificate",
] as const;

export const verificationDocumentTypeMap: Record<
  (typeof verificationDocumentTypes)[number],
  VerificationDocumentType
> = {
  citizenship: "CITIZENSHIP",
  nationalcard: "NATIONAL_IDENTITY_CARD",
  drivinglicense: "DRIVING_LICENSE",
  pan_vat: "PAN_VAT",
  certificate: "CERTIFICATE",
};

export const municipalityTypes = [
  "metropolitan",
  "sub_metropolitan",
  "municipality",
  "rural_municipality",
] as const;

export const municipalityTypeMap: Record<
  (typeof municipalityTypes)[number],
  MunicipalityType
> = {
  metropolitan: "METROPOLITAN",
  sub_metropolitan: "SUB_METROPOLITAN",
  municipality: "MUNICIPALITY",
  rural_municipality: "RURAL_MUNICIPALITY",
};
