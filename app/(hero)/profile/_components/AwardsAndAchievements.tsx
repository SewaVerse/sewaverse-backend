"use client";

import { Edit } from "lucide-react";
import Image from "next/image";

import ShineBorder from "@/components/ui/shine-border";

const awardsData = [
  {
    image: "/images/image1.webp",
    name: "Hair Cutting Competition",
  },
  {
    image: "/images/image3.webp",
    name: "Best Stylist Award",
  },
  {
    image: "/images/image3.webp",
    name: "Innovation in Hairdressing",
  },
];

const AwardsAndAchievements = () => {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center py-2">
        <h1 className="font-bold text-xl sm:text-2xl">Awards & Achievements</h1>
        <Edit size={14} className="cursor-pointer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
        {awardsData.map((award, index) => (
          <ShineBorder
            key={index}
            className="p-2"
            color={["#2E3192", "#90278E", "#FE8FB5", "#A07CFE"]}
            borderWidth={3}
            borderRadius={10}
          >
            <div className="flex justify-center items-center overflow-hidden rounded-lg relative w-full h-48 sm:h-56 md:h-64">
              <Image
                src={award.image}
                alt={award.name}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="mt-2 text-center font-semibold text-sm gradient-text uppercase">
              {award.name}
            </h1>
          </ShineBorder>
        ))}
      </div>
    </section>
  );
};

export default AwardsAndAchievements;
