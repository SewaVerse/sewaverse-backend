"use client";

import { CameraIcon, Star, VerifiedIcon } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "./ui/button";

interface ProfileProps {
  name: string;
  createdAt: string;
  servicesDelivered: number;
  profession: string;
  experience: string;
  rating: number | null;
  offeredServices: string[];
  locations: string[];
  coreSkills: string[];
  imageUrl?: string;
}

export function ProfileCard({
  name,
  createdAt,
  servicesDelivered,
  profession,
  experience,
  rating,
  offeredServices,
  locations,
  coreSkills,
  imageUrl,
}: ProfileProps) {
  return (
    <Card className="w-full max-w-4xl bg-gray-50 shadow-2xl rounded-2xl m-2">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-36 h-36 md:w-44 md:h-44 border-4 border-white shadow-2xl bg-[#BCBDDC] rounded-full relative flex-shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Profile"
                width={176}
                height={176}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="absolute bottom-0 right-2 md:right-5 p-1 border bg-white rounded-full cursor-pointer">
                <CameraIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex justify-around md:justify-start items-center ">
              <div className="text-2xl md:text-4xl font-semibold flex text-center">
                <h1 className="gradient-text">{name}</h1>
                <VerifiedIcon className="w-6 h-6 text-green-500" />
              </div>
              {/* <div className="flex items-center gap-2">
                <VerifiedIcon className="w-6 h-6 text-green-500" />
                <MoreVertical className="w-6 h-6 text-gray-500" />
              </div> */}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2 text-muted-foreground font-medium">
              {/* <p className="text-sm md:text-base">
                Joined on: {format(new Date(createdAt), "EEEE, MMMM do yyyy")}
              </p> */}
              <p className="text-sm md:text-base">Joined on: {createdAt}</p>

              <span className="hidden md:inline">|</span>
              <p className="text-sm md:text-base">
                {servicesDelivered} Services Delivered
              </p>
            </div>

            <div className="flex gap-4 mt-4 font-medium justify-between">
              <div>
                <p className="text-lg text-muted-foreground">Profession</p>
                <h1 className="text-lg gradient-text font-semibold">
                  {profession}
                </h1>
              </div>
              <div>
                <p className="text-lg text-muted-foreground">Experience</p>
                <h1 className="text-lg gradient-text font-semibold">
                  {experience}
                </h1>
              </div>

              <div>
                <p className="text-lg text-muted-foreground">Rating</p>
                <p className="flex items-center text-lg gradient-text font-semibold">
                  {Array.from({ length: Math.floor(rating ?? 0) }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    )
                  )}
                  <span className="ml-1">{rating}</span>
                </p>
              </div>
            </div>

            <div className="mt-3 font-medium">
              <h3 className="text-lg text-muted-foreground ">
                Offered services
              </h3>
              <div className="flex flex-wrap gap-2">
                {offeredServices.map((service, index) => (
                  <h1
                    key={index}
                    className="text-lg font-semibold gradient-text"
                  >
                    {service} |
                  </h1>
                ))}
              </div>
            </div>

            <div className="mt-3 font-medium">
              <h3 className="text-lg text-muted-foreground">
                Location of services
              </h3>
              <h1 className="text-lg font-semibold gradient-text">
                {locations.join(", ")}
              </h1>
            </div>

            <div className="mt-3 font-medium">
              <h3 className="text-lg text-muted-foreground">Core Skills</h3>
              <div className="flex flex-wrap gap-2 items-center p-1 relative">
                {coreSkills.map((skill, index) => (
                  <Button key={index} variant="brand" size={"sm"}>
                    {skill}
                  </Button>
                ))}
                {/* <MoreVertical className="w-6 h-6 text-gray-500 absolute right-[-20px] md:right-[-40px] top-6" /> */}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
