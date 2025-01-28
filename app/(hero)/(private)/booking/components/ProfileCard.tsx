"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RiStarFill } from "react-icons/ri";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  capitalizeFirstLetter,
  convertDateToReadable,
  getFallbackName,
} from "@/lib/utils";

interface ProfileCardProps {
  profileId: string;
  providerName: string;
  joinedDate: string;
}

const fetchProfileData = async (profileId: string) => {
  const { data } = await axios.get(
    `/api/public/service-provider/byprofileid/${profileId}`
  );
  return data.data;
};

const ProfileCard = ({
  profileId,
  providerName,
  joinedDate,
}: ProfileCardProps) => {
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => fetchProfileData(profileId),
    enabled: !!profileId,
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex justify-center items-center h-40">
            <div className="text-center">Loading profile...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex justify-center items-center h-40">
            <div className="text-center text-red-500">
              Error loading profile
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Provide default values for all potentially undefined properties
  const {
    profession = "",
    profileImage = "",
    rating = 0,
    servicesDelivered = 0,
    experience = "",
  } = profileData || {};

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center justify-center">
            {/* Profile Section */}
            <div className="flex flex-1 flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-2 ring-primary ring-offset-2">
                  <AvatarImage src={profileImage} alt={providerName} />
                  <AvatarFallback>
                    {getFallbackName(providerName)}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 gap-1 px-2 py-1">
                  <RiStarFill className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{rating.toFixed(1)}</span>
                </Badge>
              </div>

              <div className="text-center">
                <h2 className="text-lg font-bold">
                  {capitalizeFirstLetter(providerName)}
                </h2>
                <p className="text-muted-foreground font-bold">
                  {capitalizeFirstLetter(profession)}
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="hidden md:block" />
            <Separator className="md:hidden" />

            {/* Stats Section */}
            <div className="flex-1">
              <dl className="space-y-2">
                {/* Joined Date */}
                <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-2 transition-colors hover:bg-muted">
                  <dt className="text-sm text-muted-foreground">Joined Date</dt>
                  <dd className="text-center text-sm font-semibold">
                    {convertDateToReadable(joinedDate)}
                  </dd>
                </div>

                {/* Services Delivered */}
                <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-2 transition-colors hover:bg-muted">
                  <dt className="text-sm text-muted-foreground">
                    Services Delivered
                  </dt>
                  <dd className="text-center text-sm font-semibold">
                    {servicesDelivered}
                  </dd>
                </div>

                {/* Experience */}
                <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-2 transition-colors hover:bg-muted">
                  <dt className="text-sm text-muted-foreground">
                    Experience Years
                  </dt>
                  <dd className="text-center text-sm font-semibold">
                    {experience}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
