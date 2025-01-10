"use client";

import { CirclePlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AwardsAndCertifications from "../sewaproviderstep3/components/AwardsAndCertifications";
import HeroSection from "../sewaproviderstep3/components/HeroSection";
import License from "../sewaproviderstep3/components/License";
import MyWorks from "../sewaproviderstep3/components/MyWorks";
import Profile from "../sewaproviderstep3/components/Profile";
import WorkExperiences from "../sewaproviderstep3/components/WorkExperiences";
import SelectServices from "./components/SelectServices";
import UploadProfilePicture from "./components/UploadProfilePicture";

export default function SewaProviderStep1() {
  // const [showPopup, setShowPopup] = useState(false);

  // const handleNext1Click = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault(); // Prevent form submission
  //   setShowPopup(true);
  // };

  // const closePopup = () => {
  //   setShowPopup(false);
  // };

  const [openUploadProfile, setOpenUploadProfile] = useState<boolean>(false);
  const [openSelectServices,setOpenSelectServices] = useState<boolean>(false) 


  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      <div className="w-full lg:w-1/5 h-[80vh]  rounded-lg shadow border p-6 lg:ml-10">
        <h3 className="text-lg font-semibold text-center mb-2">Step 2/3</h3>
        <h3 className="text-lg font-semibold text-center">
          Create your business profile
        </h3>
        <p className="text-sm text-gray-500 mt-4">
          Create your business profile Your Profile is Your First Impression. It
          is the face of your services. Customers rely on it to learn about your
          expertise and decide if you&apos;re the right fit for their needs.
          Ensure it&apos;s accurate, professional, and showcases your strengths.
        </p>

        <form className="mt-4 space-y-6">
          <div className="border border-solid border-black rounded-md h-20 flex items-center justify-between px-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture <br />
              <span className="text-gray-500">(Required*)</span>
            </label>
            <div
              onClick={() => setOpenUploadProfile(true)}
              className="border border-dotted border-black rounded-md h-[57px] w-[158px] flex flex-col items-center justify-center"
            >
              <span className="text-green-500">
                <CirclePlus />
              </span>
              <span className="text-[12px] text-gray-700">Upload Picture</span>
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
              className="w-full p-2 border border-solid border-black rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Experienced (Required*)
              </option>
              <option value="freshers"> Freshers</option>
              <option value="1"> 1 year</option>
              <option value="2"> 2 years</option>
              <option value="3"> 3 years</option>
              <option value="4"> 4 years</option>
              <option value="5"> 5+ years</option>
              <option value="10">10+ years</option>
            </select>
          </div>

          <div className="border border-solid border-black rounded-md h-20 flex items-center justify-between px-4">
            <label className="block text-sm font-medium text-gray-700">
              Offered Service <br />
              <span className="text-gray-500">(Required*)</span>
            </label>
            <div
              className="border border-dotted border-black rounded-md h-[57px] w-[158px] flex flex-col items-center justify-center cursor-pointer"
              onClick={()=>setOpenSelectServices(true)}
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
        <div className="bg-blue-100 h-[35vh] p-6 rounded-lg shadow  "> </div>
        <Profile />
        <div className="bg-gray-50 opacity-50 cursor-not-allowed">
          <HeroSection />
          <h2 className="text-xl px-10 font-bold tracking-tight mt-2">
            About Me
          </h2>
          <WorkExperiences />
          <License />
          <AwardsAndCertifications />
          <MyWorks />
        </div>
      </div>

      {/* popup  */}
      {/* add profile */}
      {openUploadProfile && (
        <UploadProfilePicture
          openUploadProfile={openUploadProfile}
          setOpenUploadProfile={setOpenUploadProfile}
        />
      )}
      {/* select Service */}
      {
        openSelectServices &&(
          <SelectServices openSelectServices = {openSelectServices} setOpenSelectServices ={setOpenSelectServices} />

        )
      }

      {/* {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 h-1/2">
            <div className="flex justify-between items-center ">
              <h2 className="text-lg px-52">
                Select The Service That You are Offering!
              </h2>
              <X
                onClick={closePopup}
                className="cursor-pointer text-gray-700"
              />
            </div>
            <div className="px-52 mt-2">
              <p>
                Connect with the clients,showcase your skills and grow your
                business.
              </p>
            </div>
            <div className="text-center mt-4">
              <p>Sewa Category</p>
              <select className="mt-2 border border-gray-300 rounded-lg w-5/12 h-10">
                <option>Search a Sewa Category</option>
                <option>Service 1</option>
                <option>service 2</option>
              </select>
              <p className="mt-1 text-muted-foreground text-sm">
                {" "}
                Select the Category based on the sewa you will be providing
              </p>
            </div>

            <div className="mt-4 flex gap-14 mx-4">
              <div className="flex items-center">
                <Checkbox />
                <span>Home Maintenance</span>
              </div>
              <div className="flex items-center">
                <Checkbox />
                <span className="ml-2">Computer Repair and Maintenance</span>
              </div>
              <div className="flex items-center">
                <Checkbox />
                <span className="ml-2">Pet Care Sewa</span>
              </div>
            </div>
            <div className="mt-2 flex gap-24 mx-4">
              <div className="flex items-center">
                <Checkbox />
                <span className="ml-2">Construction</span>
              </div>
              <div className="flex items-center ml-2">
                <Checkbox />
                <span className="ml-2">Beauty and Personal Care</span>
              </div>
              <div className="flex items-center ml-6">
                <Checkbox />
                <span className="ml-2">Pet Care Sewa</span>
                <span></span>
              </div>
            </div>

            <div className="text-center my-10  text-s ">
              <p>
                If youe desired service is not listed above,{" "}
                <span className="gradient-text">+ Add New Service</span>
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
