"use client";

import {
  MyWork,
  OfferedService,
  Prisma,
  Service,
  ServiceProvider,
  ServiceProviderProfile,
} from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import axiosClient from "@/axios";

import ProfileComponent from "./_components/profile-card";
import { ProfileDetails } from "./_components/profile-details";

type Work = MyWork & {
  workImages: Prisma.FileGetPayload<{ include: { fileBinaries: true } }>[];
};

export type ProfileResponse = ServiceProvider & {
  profile: ServiceProviderProfile & {
    image: Prisma.FileGetPayload<{ include: { fileBinaries: true } }>;
  };
  offeredServices: OfferedService[];

  serviceCategories: Service[];
  workExperiences: Prisma.WorkExperienceGetPayload<{
    include: { file: { include: { fileBinaries: true } } };
  }>[];
  awards: Prisma.AwardGetPayload<{
    include: { file: { include: { fileBinaries: true } } };
  }>[];
  licenses: Prisma.LicenseGetPayload<{
    include: { file: { include: { fileBinaries: true } } };
  }>[];
  myWorks: Work[];
};

const ProfilePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () =>
      axiosClient.get("/service-provider/profile").then((res) => res.data),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const serviceProvider = data.serviceProvider as ProfileResponse;

  const {
    name,
    createdAt,
    profile,
    workExperiences,
    awards,
    licenses,
    myWorks,
    serviceCategories,
  } = serviceProvider;
  return (
    <div>
      {/* Background section */}
      {/* <div className="bg-red-300 h-[44vh] w-full"></div> */}
      <div className="flex justify-center  relative">
        {/* Cover card section */}
        <div className="absolute bg-brand h-[20rem] w-full"></div>

        {/* Profile card section */}
        <div className="z-10 mt-[8rem]">
          <ProfileComponent
            name={name}
            createdAt={createdAt}
            profile={profile}
            workExperiences={workExperiences}
            serviceCategories={serviceCategories}
          />
        </div>
      </div>

      <div className="md:mx-[7rem] md:my-[1rem] lg:mx-[14.25rem]">
        {/* Profile content section */}
        <div className="">
          <ProfileDetails
            profile={profile}
            workExperiences={workExperiences}
            awards={awards}
            myWorks={myWorks}
            licenses={licenses}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
