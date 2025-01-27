import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
const offerService = [
  {
    serviceTitle: "Wiring Services",
    slogan: "Mechanical",
    serviceIcon: "/images/servicesImage/Mechanics.svg",
    discountPrice: "15000",
    originalPrice: "25000",
    discountPercentage: "40%",
    description:
      "At our salon, we believe that a great haircut is more than just a routine – it's an experience. Our talented team of stylists is dedicated to crafting a look that perfectly suits your personality, lifestyle, and hair type. Whether you're after a classic style, a trendy cut, or something completely new, we take the time to consult with you, ensuring that your vision comes to life. Using only the finest tools and techniques, we focus on precision and creativity to deliver a cut that not only looks incredible but is easy to maintain.",
    extraInfo:
      "Would you like to tailor this for a specific clientele or service type?",
  },
];

const profileData = {
  name: "Bishal Shrestha",
  profession: "Painter",
  rating: 4.5,
  profile: "/images/servicesImage/profile1.svg",
  start: "Joined in Jan, 2024",
  Delivered: "100 Services Delivered",
  experience: "5 Years Experience",
};

const Page = () => {
  return (
    <div>
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row  my-4 mx-2 md:mx-12">
        <div className="">
          <LeftSide offerService={offerService} />
        </div>

        <div className=" ">
          <RightSide profileData={profileData} />
        </div>
      </div>
    </div>
  );
};

export default Page;
