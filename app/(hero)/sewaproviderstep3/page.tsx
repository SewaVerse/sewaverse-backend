/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddAchievements from "./components/AddAchievements";
import AddLicense from "./components/AddLicense";
import AddMoreAchievements from "./components/AddMoreAchievements";
import AddWorkExperience from "./components/AddWorkExperience";
import AddYourWorks from "./components/AddYourWorks";
import AwardsAndCertifications from "./components/AwardsAndCertifications";
import CongratulationsModal from "./components/CongratulationsModal";
import HeroSection from "./components/HeroSection";
import License from "./components/License";
import MyWorks from "./components/MyWorks";
import Profile from "./components/Profile";
import WorkExperiences from "./components/WorkExperiences";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [licenseOpen, setLicenseOpen] = useState<boolean>(false);
  const [awardOpen, setAwardOpen] = useState<boolean>(false);
  const [worksOpen, setWorksOpen] = useState<boolean>(false);
  const [openMoreAchievements, setOpenMoreAchievements] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState(false);
  // const router = useRouter()

  const handleClick = () => {
    setOpenMessage(true); 
    
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* sidebar */}
        <div className="w-full lg:w-1/5 lg:ml-10 max-h-[1220px] rounded-lg shadow p-6">
          <h3
            className="text-lg font-semibold text-center mb-2"
            style={{ color: "#878787" }}
          >
            Step 3/3
          </h3>
          <h3 className="text-lg font-semibold text-center">
            Make Your Profile Shine: <br />
            Add More Details!
          </h3>
          <p className="text-sm text-gray-500 mt-4">
            Let your customers get to know you better! Build credibility and
            gain their trust. Show them why they should choose YOU.
          </p>

          <form className="mt-4 space-y-4">
            <div className="border border-solid h-[400px] w-[350px] lg:w-[330px] rounded-lg py-2 px-4   ">
              <p className="text-lg">About Me</p>
              <p className="text-muted-foreground">
                Share your story, expertise and experiences in your own unique
                words. Make your clients trust in you !
              </p>
              {/* <textarea
              className="h-[400px] w-[350px] lg:w-[330px]  rounded-lg py-2 px-4 text-left text-sm "
              placeholder="Share your story, expertise, and experiences in your own unique words. M"
            /> */}
            </div>

            <div className="border border-solid border-black rounded-md h-[100px] flex items-center justify-between px-4">
              <label className="block text-sm font-medium text-black">
                Experience <br />
                <p className="text-muted-foreground text-[15px]">
                  Showcase your skills and experience.{" "}
                </p>
              </label>
              <div
                onClick={() => setModalOpen(true)}
                className="border border-dotted border-black rounded-md h-[75px] w-[140px] lg:w-[120px] flex flex-col items-center justify-center"
              >
                <span className="text-green-500">
                  <CirclePlus />
                </span>
                <span className="text-[12px] text-gray-700 mt-2">
                  Add Experience
                </span>
              </div>
            </div>

            <div className="border border-solid border-black rounded-md h-[100px] flex items-center justify-between px-4">
              <label className="block text-sm font-medium text-black">
                Licence <br />
                <p className="text-muted-foreground text-[10px] lg:text-[15px]">
                  Verify your qualification & standout more.
                </p>
              </label>
              <div
                onClick={() => setLicenseOpen(true)}
                className="border border-dotted border-black rounded-md h-[75px] w-[115px] lg:w-[140px] flex flex-col items-center justify-center"
              >
                <span className="text-green-500">
                  <CirclePlus />
                </span>
                <span className="text-[12px] text-gray-700 mt-2">
                  Add Licence
                </span>
              </div>
            </div>
            <div className="border border-solid border-black rounded-md h-[100px] flex items-center justify-between px-4">
              <label className="block text-sm font-medium text-black">
                Awards & Achievements <br />
                <p className="text-muted-foreground text-[14px]">
                  Build Reliability & Trust of Clients.{" "}
                </p>
              </label>
              <div
                onClick={() => setAwardOpen(true)}
                className="border border-dotted border-black rounded-md h-[75px] w-[120px] lg:w-[115px] flex flex-col items-center justify-center"
              >
                <span className="text-green-500">
                  <CirclePlus />
                </span>
                <span className="text-[12px] text-gray-700 mt-2">
                  Add Certification
                </span>
              </div>
            </div>
            <div className="border border-solid border-black rounded-md h-[95px] flex items-center justify-between px-4">
              <label className="block text-sm font-medium text-black">
                My Works <br />
                <p className="text-muted-foreground text-[10px] lg:text-[15px]">
                  Show your previous works and attract customers.
                </p>
              </label>
              <div
                onClick={() => setWorksOpen(true)}
                className="border border-dotted border-black rounded-md h-[75px]  w-[140px] lg:w-[170px] flex flex-col items-center justify-center"
              >
                <span className="text-green-500">
                  <CirclePlus />
                </span>
                <span className="text-[12px] text-gray-700 mt-2">
                  Add Works
                </span>
              </div>
            </div>

            <Button
            type="button"
              variant={"brand"}
              className="w-full mt-2 text-white shadow-md hover:shadow-lg px-8 py-4"
             
              onClick={handleClick}
            >
              Next
            </Button>
            <Button
              className="w-full mt-2 text-white shadow-md hover:shadow-lg px-8 py-4"
              
            >
              Previous
            </Button>

            <p className="w-full mt-2 text-gray-400 underline hover:text-gray-700 text-center">
              Skip
            </p>
          </form>
        </div>

        {/* right section */}
        <div className="hidden lg:block lg:flex-1 lg:border lg:mr-10">
          <h3 className="text-lg">Preview</h3>
          <div className="opacity-50 bg-gray-50">

          <div className=" h-[35vh] bg-[#BCBDDC] "></div>
          {/* for profile */}
           <Profile />
          </div>
          {/* for navbar */}
          <div className="container mx-auto ">
            <HeroSection/>
            <h2 className="text-xl px-10 font-bold tracking-tight mt-2">
              About Me
            </h2>
            <p className="px-10   text-lg text-[#464646]">
              A seasoned professional barber with over a decade of dedicated
              experience in the grooming and hairstyling industry. His expertise
              lies in delivering both modern and classic haircuts, intricate
              beard styling, and tailored grooming services that cater to the
              unique preferences of each client. Bishal's unwavering passion for
              his craft drives him to help his clients not only look their best
              but also feel confident and revitalized
            </p>

            {/* my works */}
            <WorkExperiences />
            {/* License */}
            <License />

            <AwardsAndCertifications />
            {/* my works */}
            <MyWorks />

            {/* Add Work Experience Modal */}
            {modalOpen && (
              <AddWorkExperience
                modalOpen={modalOpen}
                onOpenChange={setModalOpen}
              />
            )}
            {/* Add works license Modal */}
            {licenseOpen && (
              <AddLicense
                licenseOpen={licenseOpen}
                onOpenChange={setLicenseOpen}
              />
            )}
            {/* for awards and achievements */}
            {awardOpen && (
              <AddAchievements
                awardOpen={awardOpen}
                onOpenChange={setAwardOpen}
              />
            )}

            {openMoreAchievements && (
              <AddMoreAchievements
                openMoreAchievements={openMoreAchievements}
                setOpenMoreAchievements={setOpenMoreAchievements}
              />
            )}
            {/* for works.. */}
            {worksOpen && (
              <AddYourWorks worksOpen={worksOpen} onOpenChange={setWorksOpen} />
            )}
            {/* CongratulationsModal */}
            {
              openMessage &&(
                <CongratulationsModal openMessage = {openMessage} setOpenMessage = {setOpenMessage}/>

              )
            }
           
           {/* for Add sewa */}
           {/* <AddSewaModal /> */}
          </div>
        </div>
        
      </div>
     
    </>
  );
};

export default page;
