import Image from "next/image";
import { RiStarFill } from "react-icons/ri";

const profileData = {
  name: "Bishal Shrestha",
  profession: "Painter",
  rating: 4.5,
  profile: "/images/servicesImage/profile1.svg",
  start: "Joined in Jan, 2024",
  Delivered: "100 Services Delivered",
  experience: "5 Years Experience",
};

const RightSide = () => {
  return (
    <div className="flex mt-16 justify-between gap-5">
      <div className="w-[350px] h-[150px] border  shadow-lg rounded-md ">
        <div className="flex flex-col items-center p-4">
          <div>
          <div className="w-[80px] h-[80px] border  rounded-full flex ">
            <Image
              src={profileData.profile}
              alt="profile"
              height={80}
              width={80}
            />
            
          </div>
          <p className="flex items-center">
              <RiStarFill color="orange" size={20} /> {profileData.rating}{" "}
            </p>
          </div>
         

          <h1 className="text-xl font-semibold ">{profileData.name}</h1>
          <p className="text-muted-foreground text-base ">
            {profileData.profession}
          </p>
        </div>
      </div>

      <div className="w-[350px] h-[200px] border"></div>
    </div>
  );
};

export default RightSide;
