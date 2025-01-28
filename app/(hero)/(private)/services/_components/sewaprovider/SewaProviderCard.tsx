"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Award, Heart, MapPin, Star } from "lucide-react";
import { FaHandHolding } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalizeFirstLetter, getFallbackName } from "@/lib/utils";

import { LoadingSkeleton } from "./SewaProviderSkeleton";

interface OfferedService {
  id: string;
  serviceProviderId: string;
  serviceId: string;
  title: string;
  description: string;
  price: number;
  priceType: "HOURLY" | "FIXED";
  discount: number;
  location: string | null;
  workExperience: string | null;
  overallRating: number;
  published: boolean;
  adminVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  providerType: string;
  offeredServices: OfferedService[]; // You might want to define a more specific type
  profiles: Array<{
    profession: string;
    location?: string[];
    overallRating?: string;
    experience?: string;
  }>;
}

const fetchServiceProviders = async () => {
  const response = await axios.get("/api/public/service-provider");
  return response.data.data.data;
};

export function ServiceProviderCard() {
  const {
    data: providers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["serviceProviders"],
    queryFn: fetchServiceProviders,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {providers?.map((provider: ServiceProvider) => {
        const profile = provider.profiles[0] || {};

        return (
          <Card
            key={provider.id}
            className="w-full mx-auto hover:shadow-lg transition-shadow min-w-lg cursor-pointer"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-[16/9]">
                <Avatar className="w-full h-full rounded-t-lg">
                  <AvatarImage
                    src="/images/hero/hero-1.jpg"
                    alt={provider.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="w-full h-full">
                    {getFallbackName(provider.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <h3 className="font-semibold text-white text-base">
                      {capitalizeFirstLetter(provider.name)}
                    </h3>
                    {/* <Badge className="bg-brand-gradient text-white">
                      {profile.profession || "No Profession"}
                    </Badge> */}
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size={"sm"}
                          className="rounded-full bg-brand-gradient"
                        >
                          <Heart className="h-4 w-4" color="white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to favorites</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-3">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold">
                      {capitalizeFirstLetter(profile.profession) || ""}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {profile.location?.[0] || "Location not specified"}
                      </span>
                    </div>
                    <div className="text-muted-foreground text-xs font-medium+">
                      {provider.providerType}
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-100 px-1 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium text-yellow-700 ">
                      {profile.overallRating || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-2 pt-2 flex justify-between gap-1 items-center border-t">
              <div className="flex flex-col">
                <div className="flex items-center text-xs font-medium text-muted-foreground">
                  <Award className="w-4 h-4 text-primary mr-1" />
                  <span>
                    {profile.experience
                      ? `${profile.experience} years experience`
                      : "Experience not specified"}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center text-xs font-medium text-muted-foreground">
                    <FaHandHolding className="w-4 h-4 text-primary mr-1" />
                    {provider.offeredServices.length} offered services
                  </div>
                </div>
              </div>
              <Button variant="brand" size="sm" className="font-semibold">
                Book now
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default ServiceProviderCard;
