export const MINIOURL = "http://127.0.0.1:9000/sewaverse/";

export const BUCKET_NAME = "sewaverse";

export const UserRole = {
  USER: "USER",
  SERVICE_PROVIDER: "SERVICE_PROVIDER",
  COMPANY: "COMPANY",
  ADMIN: "ADMIN",
};

export const bookingStatusTypes = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export interface Service {
  id: string;
  serviceName: string;
  status: boolean;
  category: string;
  price: string;
  discount: string;
  location: string;
  time: string;
  image: string;
}
