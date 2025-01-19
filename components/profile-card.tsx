import { CameraIcon, VerifiedIcon } from "lucide-react";
import { CiMenuKebab } from "react-icons/ci";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  name: string;
  joinDate: string;
  servicesDelivered: number;
  profession: string;
  experience: string;
  rating: number;
  offeredServices: string[];
  locations: string[];
  coreSkills: string[];
  imageUrl: string; // Add imageUrl prop
}

const ProfileCard = ({
  name,
  joinDate,
  servicesDelivered,
  profession,
  experience,
  rating,
  offeredServices,
  locations,
  coreSkills,
  imageUrl, // Destructure imageUrl prop
}: ProfileProps) => {
  return (
    <div className="flex justify-center items-center mt-10 md:mt-0">
      <div className="w-full max-w-4xl border bg-gray-50 shadow-2xl rounded-2xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-36 h-36 md:w-44 md:h-44 border-4 bg-[#BCBDDC] rounded-full relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="absolute bottom-0 right-2 md:right-5 p-1 border bg-white rounded-full cursor-pointer">
                <CameraIcon />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl text-[#023994] font-semibold relative">
              {name}
              <div className="absolute right-0 top-0">
                <VerifiedIcon color="green" />
              </div>
            </h1>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-base mt-2">
              <p>Join on: {joinDate}</p>
              <span className="hidden md:inline">|</span>
              <p>{servicesDelivered} Services Delivered</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between text-lg text-[#5C5C5C] mt-4">
              <p className="flex-1">Profession</p>
              <p className="flex-1">Experience</p>
              <p className="flex-1">Rating</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between text-xl font-semibold mt-2">
              <p className="flex-1 gradient-text">{profession}</p>
              <p className="flex-1 gradient-text">{experience}</p>
              <p className="flex">
                ⭐⭐⭐⭐ <span>{rating}</span>
              </p>
            </div>
            <div className="text-xl mt-4">
              <h3 className="text-muted-foreground">Offered services</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {offeredServices.map((service, index) => (
                <p key={index} className="gradient-text text-xl font-semibold">
                  {service}
                </p>
              ))}
            </div>
            <h3 className="text-xl font-normal mt-4">Location of services</h3>
            <div className="text-xl font-bold gradient-text mt-2">
              {locations.join(", ")}
            </div>
            <h3 className="text-xl font-normal mt-4">Core Skills</h3>
            <div className="flex flex-wrap gap-2 items-center p-1 relative cursor-not-allowed mt-2">
              {coreSkills.map((skill, index) => (
                <Button
                  key={index}
                  variant="brand"
                  className="cursor-not-allowed"
                >
                  {skill}
                </Button>
              ))}
              <CiMenuKebab
                size={30}
                className="rotate-90 absolute right-[-20px] md:right-[-80px] top-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
