import Image from "next/image";
import { RiStarFill } from "react-icons/ri";

import BookingForm from "./BookingForm";

interface profileData {
  name: string;
  profession: string;
  rating: number;
  profile: string;
  start: string;
  Delivered: string;
  experience: string;
}

interface RightSideProps {
  profileData: profileData;
}

const RightSide = ({ profileData }: RightSideProps) => {
  return (
    <div>
      <div>
        <div className="hidden lg:flex mt-16 gap-1  ">
          <div className="w-[198px] h-[160px] border  ">
            <div className="flex flex-col items-center p-4 relative">
              <div className="w-[80px] h-[80px] border  rounded-full flex ">
                <Image
                  src={profileData.profile}
                  alt="profile"
                  height={80}
                  width={80}
                />
                <div className="absolute right-5">
                  <p className="flex items-center">
                    <RiStarFill color="orange" size={20} /> {profileData.rating}{" "}
                  </p>
                </div>
              </div>

              <h1 className="text-xl font-semibold ">{profileData.name}</h1>
              <p className="text-muted-foreground text-xl ">
                {profileData.profession}
              </p>
            </div>
          </div>

          <div className="w-[198px] h-[160px] border p-3  text-lg">
            <p>{profileData.start}</p>
            <p>{profileData.Delivered}</p>
            <p>{profileData.experience}</p>
          </div>
        </div>
      </div>
      <BookingForm />
    </div>
  );
};

export default RightSide;
