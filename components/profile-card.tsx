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
    <Card className="w-full max-w-4xl m-2 shadow-2xl bg-gray-50 rounded-2xl">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          <div className="w-36 h-36 md:w-44 md:h-44 border-4 border-white shadow-2xl bg-[#BCBDDC] rounded-full relative flex-shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Profile"
                width={176}
                height={176}
                className="object-cover rounded-full"
              />
            ) : (
              <div className="absolute bottom-0 p-1 bg-white border rounded-full cursor-pointer right-2 md:right-5">
                <CameraIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex items-center justify-around md:justify-start ">
              <div className="flex text-2xl font-semibold text-center md:text-4xl">
                <h1 className="gradient-text">{name}</h1>
                <VerifiedIcon className="w-6 h-6 text-green-500" />
              </div>
              {/* <div className="flex items-center gap-2">
                <VerifiedIcon className="w-6 h-6 text-green-500" />
                <MoreVertical className="w-6 h-6 text-gray-500" />
              </div> */}
            </div>

            <div className="flex flex-col items-center gap-2 mt-2 font-medium md:flex-row md:gap-4 text-muted-foreground">
              {/* <p className="text-sm md:text-base">
                Joined on: {format(new Date(createdAt), "EEEE, MMMM do yyyy")}
              </p> */}
              <p className="text-sm md:text-base">Joined on: {createdAt}</p>

              <span className="hidden md:inline">|</span>
              <p className="text-sm md:text-base">
                {servicesDelivered} Services Delivered
              </p>
            </div>

            <div className="flex justify-between gap-4 mt-4 font-medium">
              <div>
                <p className="text-lg text-muted-foreground">Profession</p>
                <h1 className="text-lg font-semibold gradient-text">
                  {profession}
                </h1>
              </div>
              <div>
                <p className="text-lg text-muted-foreground">Experience</p>
                <h1 className="text-lg font-semibold gradient-text">
                  {experience}
                </h1>
              </div>

              <div>
                <p className="text-lg text-muted-foreground">Rating</p>
                <p className="flex items-center text-lg font-semibold gradient-text">
                  {Array.from({ length: Math.floor(rating ?? 0) }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
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
              <div className="relative flex flex-wrap items-center gap-2 p-1">
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
