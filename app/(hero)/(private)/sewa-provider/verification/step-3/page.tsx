"use client";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AwardType, LicenseType, WorkExperience, WorkType } from "@/lib/types";

import { ProfileCard } from "../../../../../../components/profile-card";
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
import WorkExperiencesView from "./components/WorkExperiences";

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

// interface WorkExperience {
//   id: number;
//   title: string;
//   company: string;
//   years: string;
//   category: string;
//   description: string;
//   certificateUrl?: string;
// }

const Page = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [licenseOpen, setLicenseOpen] = useState<boolean>(false);
  const [awardOpen, setAwardOpen] = useState<boolean>(false);
  const [worksOpen, setWorksOpen] = useState<boolean>(false);
  const [openMoreAchievements, setOpenMoreAchievements] =
    useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [text, setText] = useState<string>();
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [licenses, setLicenses] = useState<LicenseType[]>([]);
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [works, setWorks] = useState<WorkType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const handleClick = () => {
  //   setOpenMessage(true);
  // };
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleAddWorkExperience = (data: {
    jobTitle: string;
    company: string;
    duration: string;
    description?: string;
    startDate?: Date | null;
    endDate?: Date | null;
    category?: string;
    isCurrent?: boolean;
    serviceId?: string;
    verificationFile?: { file?: File | undefined };
  }) => {
    const newExperience: WorkExperience = {
      id: Date.now(),
      jobTitle: data.jobTitle,
      company: data.company,
      duration: data.duration,
      description: data.description || "",
    };
    setWorkExperiences([...workExperiences, newExperience]);
  };

  const handleAddLicense = (data: {
    licenseOf: string;
    licenseFrom: string;
    licenseNumber: string;
    licenseFile?: { file?: File | undefined };
  }) => {
    const newLicense: LicenseType = {
      id: Date.now(),
      licenseOf: data.licenseOf,
      licenseNumber: data.licenseNumber,
      issuedBy: data.licenseFrom,
    };
    setLicenses([...licenses, newLicense]);
  };

  const handleAddAward = (data: {
    title: string;
    year: string;
    awardFrom: string;
    awardFile?: { file?: File | undefined };
  }) => {
    const newAward: AwardType = {
      id: Date.now(),
      title: data.title,
      year: data.year,
      awardFrom: data.awardFrom,
      awardFile: data.awardFile,
    };
    setAwards([...awards, newAward]);
  };

  const handleAddWork = (data: {
    title: string;
    description?: string;
    workFile?: { file?: File | undefined };
  }) => {
    const newWork: WorkType = {
      id: Date.now(),
      title: data.title,
      description: data.description || "",
      workFile: data.workFile,
    };
    setWorks([...works, newWork]);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/service-provider/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ about: text }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.warn("Top error", errorDetails);
        throw new Error(
          errorDetails.message || "Failed to update about section."
        );
      }

      const responseData = await response.json();
      toast.success(
        responseData.message || "About section updated successfully!"
      );
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.warn("Bottom error.", error.message || error);
        toast.error(error.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* sidebar */}
        <div className="w-full lg:w-1/4 lg:ml-10 max-h-[1220px] rounded-lg shadow p-4">
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
          <p className="text-sm text-gray-500 mt-4 text-justify">
            Let your customers get to know you better! Build credibility and
            gain their trust. Show them why they should choose YOU.
          </p>

          <form className="mt-4 space-y-4">
            <Textarea
              className="h-80 font-work-sans border-2 border-slate-500"
              value={text}
              onChange={handleInputChange}
              placeholder={`About Me\nShare your story, expertise, and experiences in your own unique words. Make your clients trust in you!`}
            />

            <div className="border-2 border-slate-500 rounded-md h-[100px] flex items-center justify-between px-4">
              <label className="block text-sm font-medium text-black">
                Work Experience <br />
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Showcase your skills and experience.{" "}
                </p>
              </label>
              <div
                onClick={() => setModalOpen(true)}
                className="border-2 border-dashed border-slate-500 rounded-md h-[75px] w-[140px] lg:w-[120px] flex flex-col items-center justify-center"
              >
                <span className="text-green-500">
                  <CirclePlus />
                </span>
                <span className="text-xs text-gray-700 mt-2">
                  Add Experience
                </span>
              </div>
            </div>

            <div className="border-2 border-slate-500 rounded-md h-[100px] flex items-center justify-between px-4">
              <label className="block text-sm font-medium text-black">
                Licence <br />
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Verify your qualification & standout more.
                </p>
              </label>
              <div
                onClick={() => setLicenseOpen(true)}
                className="border-2 border-dashed border-slate-500 rounded-md h-[75px] w-[115px] lg:w-[140px] flex flex-col items-center justify-center"
              >
                <span className="text-green-500">
                  <CirclePlus />
                </span>
                <span className="text-xs text-gray-700 mt-2">Add Licence</span>
              </div>
            </div>
            <div className="border-2 border-slate-500 rounded-md h-[100px] flex items-center justify-between px-4">
              <label className="block text-sm font-medium text-black">
                Awards & Achievements <br />
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Build Reliability & Trust of Clients.{" "}
                </p>
              </label>
              <div
                onClick={() => setAwardOpen(true)}
                className="border-2 border-dashed border-slate-500 rounded-md h-[75px] w-[120px] lg:w-[115px] flex flex-col items-center justify-center"
              >
                <span className="text-green-500">
                  <CirclePlus />
                </span>
                <span className="text-xs text-gray-700 mt-2">
                  Add Certification
                </span>
              </div>
            </div>
            <div className="border-2 border-slate-500 rounded-md h-[95px] flex items-center justify-between px-4">
              <label className="block text-sm font-medium text-black">
                My Works <br />
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Show your previous works and attract customers.
                </p>
              </label>
              <div
                onClick={() => setWorksOpen(true)}
                className="border-2 border-dashed border-slate-500 rounded-md h-[75px]  w-[140px] lg:w-[170px] flex flex-col items-center justify-center"
              >
                <span className="text-green-500">
                  <CirclePlus />
                </span>
                <span className="text-xs text-gray-700 mt-2">Add Works</span>
              </div>
            </div>

            <Button
              type="button"
              variant={"brand"}
              className="w-full mt-2 shadow-md hover:shadow-lg"
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : "Next"}
            </Button>
            <Button
              variant={"brand"}
              className="w-full mt-2 text-white shadow-md hover:shadow-lg"
            >
              Previous
            </Button>

            <Button
              variant={"ghost"}
              className="w-full underline text-muted-foreground hover:bg-white"
            >
              Skip
            </Button>
          </form>
        </div>

        {/* right section */}
        <div className="hidden lg:block lg:flex-1 lg:border lg:mr-10">
          <h3 className="text-lg">Preview</h3>
          <div className="opacity-50 bg-gray-50">
            <div className=" h-[35vh] bg-[#BCBDDC] "></div>
            {/* for profile */}
            <ProfileCard {...profileData} imageUrl="" />
          </div>
          {/* for navbar */}
          <div className="container mx-auto px-10">
            <HeroSection />
            <h2 className="text-2xl font-bold py-6 ">About Me</h2>
            <p className="text-lg font-normal mb-4 text-justify">{text}</p>

            {/* my works */}
            <WorkExperiencesView experiences={workExperiences} />
            {/* License */}
            <License licenses={licenses} />

            <AwardsAndCertifications awards={awards} />
            {/* my works */}
            <MyWorks works={works} />

            {/* Add Work Experience Modal */}
            {modalOpen && (
              <AddWorkExperience
                modalOpen={modalOpen}
                onOpenChange={setModalOpen}
                onSave={handleAddWorkExperience}
              />
            )}
            {/* Add works license Modal */}
            {licenseOpen && (
              <AddLicense
                licenseOpen={licenseOpen}
                onOpenChange={setLicenseOpen}
                onSave={handleAddLicense}
              />
            )}
            {/* for awards and achievements */}
            {awardOpen && (
              <AddAchievements
                awardOpen={awardOpen}
                onOpenChange={setAwardOpen}
                onSave={handleAddAward}
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
              <AddYourWorks
                worksOpen={worksOpen}
                onOpenChange={setWorksOpen}
                onSave={handleAddWork}
              />
            )}
            {/* CongratulationsModal */}
            {openMessage && (
              <CongratulationsModal
                openMessage={openMessage}
                setOpenMessage={setOpenMessage}
              />
            )}
            {/* for Add sewa */}
            {/* <AddSewaModal /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
