export interface ProfileData {
  name: string;
  joinedDate: string;
  servicesDelivered: number;
  profession: string;
  experience: string;
  rating: number;
  offeredServices: string[];
  location: string[];
  coreSkills: string[];
  profileImage: string | null;
}

export interface WorkExperience {
  id: number;
  jobTitle: string;
  company: string;
  duration: string;
  description: string;
  // startDate: string;
  // endDate: string | null;
  // isCurrent: boolean;
  // serviceId: string;
  verificationFile?: {
    file: File;
  };
}

export interface LicenseType {
  id: number;
  licenseOf: string;
  licenseNumber: string;
  issuedBy: string;
  certificateUrl?: string;
}

export interface AwardType {
  id: number;
  title: string;
  year: string;
  awardFrom: string;
  awardFile?: { file?: File | undefined };
}

export interface WorkType {
  id: number;
  title: string;
  description: string;
  workFile?: { file?: File | undefined };
}

export interface OfferedService {
  id: string;
  serviceProviderId: string;
  serviceId: string;
  title: string;
  description: string;
  price: number;
  priceType: string;
  discount: number;
  location: string | null;
  workExperience: string | null;
  overallRating: number;
  published: boolean;
  adminVerified: boolean;
  createdAt: string;
  updatedAt: string;
  service: {
    id: string;
    name: string;
    description: string | null;
    parentServiceId: string;
    imageId: string | null;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  };
  serviceProvider: {
    createdAt: string;
    id: string;
    serviceProviderId: string;
    userId: string;
    name: string;
    email: string;
    profileId: string;
    providerType: string;
  };
}