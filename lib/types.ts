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