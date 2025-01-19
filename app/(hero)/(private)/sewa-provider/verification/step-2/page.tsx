"use client";

import { CirclePlus } from "lucide-react";
import { useState } from "react";

import ProfileCard from "@/components/profile-card";
import { Button } from "@/components/ui/button";

import AwardsAndCertifications from "../step-3/components/AwardsAndCertifications";
import HeroSection from "../step-3/components/HeroSection";
import License from "../step-3/components/License";
import MyWorks from "../step-3/components/MyWorks";
import WorkExperiences from "../step-3/components/WorkExperiences";
import SelectServices from "./components/SelectServices";
import UploadProfilePicture from "./components/UploadProfilePicture";

const profileData = {
  name: "Bishal Shrestha",
  joinDate: "5th Jan, 2024",
  servicesDelivered: 100,
  profession: "Barber",
  experience: "5 Years",
  rating: 4.5,
  offeredServices: ["Hair Cutting"],
  locations: ["Kathmandu", "Bhaktapur", "Lalitpur"],
  coreSkills: ["Hair Dressing", "Hair Colouring", "Hair Cutting"],
};

export default function SewaProviderStep1() {
  // const [showPopup, setShowPopup] = useState(false);

  // const handleNext1Click = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault(); // Prevent form submission
  //   setShowPopup(true);
  // };

  // const closePopup = () => {
  //   setShowPopup(false);
  // };

  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  const [openUploadProfile, setOpenUploadProfile] = useState<boolean>(false);
  const [openSelectServices, setOpenSelectServices] = useState<boolean>(false);

  const handleImageUpload = (url: string) => {
    setProfileImageUrl(url);
    setOpenUploadProfile(false);
  };
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      <div className="w-full lg:w-1/5 h-[80vh]  rounded-lg shadow border p-6 lg:ml-10">
        <h3 className="text-lg font-semibold text-center mb-2">Step 2/3</h3>
        <h3 className="text-lg font-semibold text-center">
          Create your business profile
        </h3>
        <p className="text-sm text-gray-500 mt-4 text-justify font-open-sans font-light">
          Create your business profile Your Profile is Your First Impression. It
          is the face of your services. Customers rely on it to learn about your
          expertise and decide if you&apos;re the right fit for their needs.
          Ensure it&apos;s accurate, professional, and showcases your strengths.
        </p>

        <form className="mt-4 space-y-6">
          <div className="border border-solid border-black rounded-md h-20 flex items-center justify-between px-4">
            <label className="block text-sm font-medium text-gray-700 font-work-sans">
              Profile Picture <br />
              <span className="text-gray-500">(Required*)</span>
            </label>
            <div
              onClick={() => setOpenUploadProfile(true)}
              className="border border-dotted border-black rounded-md h-[57px] w-[158px] flex flex-col items-center justify-center"
            >
              <span className="text-green-500 cursor-pointer">
                <CirclePlus />
              </span>
              <span className="text-[12px] text-gray-700 font-open-sans cursor-pointer  ">
                Upload Picture
              </span>
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Profession (Required*)"
              className="w-full p-2 border border-solid border-black rounded-lg "
            />
          </div>
          <div>
            <select
              className="w-full p-2 border border-solid border-black rounded-lg font-work-sans"
              defaultValue=""
            >
              <option value="" disabled>
                Experienced (Required*)
              </option>
              <option value="freshers"> Fresher</option>
              <option value="1"> 1 year</option>
              <option value="2"> 2 years</option>
              <option value="3"> 3 years</option>
              <option value="4"> 4 years</option>
              <option value="5"> 5+ years</option>
              <option value="10">10+ years</option>
            </select>
          </div>

          <div className="border border-solid border-black rounded-md h-20 flex items-center justify-between px-4 font-work-sans">
            <label className="block text-sm font-medium text-gray-700">
              Offered Service <br />
              <span className="text-gray-500">(Required*)</span>
            </label>
            <div
              className="border border-dotted border-black rounded-md h-[57px] w-[158px] flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setOpenSelectServices(true)}
            >
              <span className="text-green-500">
                <CirclePlus />
              </span>
              <span className="text-[12px] text-gray-700">Add Sewa</span>
            </div>
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700">
              Profession <span className="text-red-500">(Required*)</span>
            </label> */}
            <input
              type="text"
              placeholder="Skills (Required*)"
              className="w-full p-2 border border-solid border-black rounded-lg "
            />
          </div>
          <div>
            <select
              className="w-full p-2 border border-solid border-black rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Location of Service (Required*)
              </option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
          </div>

          <Button
            variant={"brand"}
            className="w-full mt-2 text-white shadow-md hover:shadow-lg px-8 py-4"
          >
            Next
          </Button>
        </form>
      </div>

      <div className="flex-1 hidden lg:block lg:mr-10 border">
        <div className="bg-blue-100 h-[35vh] p-6 rounded-lg shadow  "></div>
        <ProfileCard {...profileData} imageUrl={profileImageUrl} />
        <div className="bg-gray-50 opacity-50 cursor-not-allowed px-10">
          <HeroSection />
          <h2 className="text-2xl font-bold mt-4 mb-8">About Me</h2>
          <WorkExperiences experiences={[]} />
          <License licenses={[]} />
          <AwardsAndCertifications awards={[]} />
          <MyWorks works={[]} />
        </div>
      </div>

      {/* popup  */}
      {/* add profile */}
      {openUploadProfile && (
        <UploadProfilePicture
          openUploadProfile={openUploadProfile}
          setOpenUploadProfile={setOpenUploadProfile}
          onImageUpload={handleImageUpload}
        />
      )}
      {/* select Service */}
      {openSelectServices && (
        <SelectServices
          openSelectServices={openSelectServices}
          setOpenSelectServices={setOpenSelectServices}
        />
      )}
    </div>
  );
}

// const VerificationStepTwo = () => {
//   return <div>VerificationStepTwo Page</div>;
// };

// export default VerificationStepTwo;
