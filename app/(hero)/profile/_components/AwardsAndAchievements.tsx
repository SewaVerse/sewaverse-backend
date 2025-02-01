"use client";

import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import ShineBorder from "@/components/ui/shine-border";
import { getImageUrl } from "@/lib/utils";

import AddMoreAchievements from "../../(private)/sewa-provider/verification/step-3/components/AddMoreAchievements";
import { ProfileResponse } from "../page";

// const awardsData = [
//   {
//     image: "/images/image1.webp",
//     name: "Hair Cutting Competition",
//   },
//   {
//     image: "/images/image3.webp",
//     name: "Best Stylist Award",
//   },
//   {
//     image: "/images/image3.webp",
//     name: "Innovation in Hairdressing",
//   },
// ];

type AwardProps = Pick<ProfileResponse, "awards">;

const AwardsAndAchievements: React.FC<AwardProps> = ({ awards }) => {
  const [openMoreAchievements, setOpenMoreAchievements] =useState<boolean>(false);
  return (
    <section>
      <div className="flex justify-between items-center py-2">
        <h1 className="font-bold text-xl sm:text-2xl">Awards & Achievements</h1>
        <Edit size={14} className="cursor-pointer" onClick={()=>setOpenMoreAchievements(true)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {awards.map((award) => (
          <ShineBorder
            key={award.id}
            className="p-2 w-full"
            color={["#2E3192", "#90278E", "#FE8FB5", "#A07CFE"]}
            borderWidth={3}
            borderRadius={10}
          >
            <div className="flex justify-center items-center  rounded-lg relative w-full h-[12rem] aspect-square">
              <Image alt={award.title} src={getImageUrl(award.file)} fill />
            </div>
            <h1 className="mt-2 text-center font-semibold text-sm gradient-text uppercase">
              {award.title}
            </h1>
          </ShineBorder>
        ))}
      </div>
      <AddMoreAchievements openMoreAchievements={openMoreAchievements} setOpenMoreAchievements={setOpenMoreAchievements}/>
    </section>
  );
};

export default AwardsAndAchievements;
