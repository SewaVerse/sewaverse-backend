import { ProfileCard } from "@/components/profile-card";

const profileData = {
  name: "Manish Maharjan",
  joinDate: "5th Jan, 2024",
  servicesDelivered: 100,
  profession: "Barber",
  experience: "5 Years",
  rating: 4.5,
  offeredServices: ["Hair Cutting", "Hair Coloring", "Hair Dressing"],
  locations: ["Kathmandu", "Bhaktapur", "Lalitpur"],
  coreSkills: [
    "Hair Dressing",
    "Hair Colouring",
    "Hair Cutting",
    "Hair Cutting",
  ],
};

const page = () => {
  return (
    <div className="flex justify-center">
      <ProfileCard {...profileData} />
    </div>
  );
};

export default page;
