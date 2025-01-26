"use client";

import { useQuery } from "@tanstack/react-query";
import { Award, CheckCircle, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SewaProvider {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  rating: number;
  location: string;
  price: number;
  experience: string;
  delivered: string;
  profileImage: string;
  profiles: {
    profession: string;
    experience: number;
    overallRating: number;
    location: string[];
  }[];
  offeredServices: {
    title: string;
    price: number;
  }[];
}

const fetchServiceProviders = async (): Promise<SewaProvider[]> => {
  const response = await fetch("/api/public/service-provider");
  const apiResponse = await response.json();

  return apiResponse.data.data.map((provider: SewaProvider) => ({
    id: provider.id,
    name: provider.name,
    title: provider.offeredServices[0]?.title || "Service Provider",
    subtitle: provider.profiles[0]?.profession || "",
    rating: provider.profiles[0]?.overallRating || 0,
    location: provider.profiles[0]?.location?.[0] || "Unknown",
    price: provider.offeredServices[0]?.price || 0,
    experience: `${provider.profiles[0]?.experience || 0} years experience`,
    delivered: `${provider.offeredServices.length} services offered`,
    profileImage: "", // Add image URL logic
  }));
};

export function ServiceProviderCard() {
  const { data: providers, isLoading } = useQuery({
    queryKey: ["serviceProviders"],
    queryFn: fetchServiceProviders,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {providers?.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div> 
  );
}

function ProviderCard({ provider }: { provider: SewaProvider }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden group">
          <Image
            src={provider.profileImage || "/placeholder.svg"}
            alt={`${provider.name}'s profile`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <div>
              <h3 className="font-semibold text-white text-lg mb-1">
                {provider.name}
              </h3>
              <Badge
                variant="secondary"
                className="bg-primary/80 text-primary-foreground"
              >
                Rs. {provider.price}
              </Badge>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Heart className="h-4 w-4" />
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
      <CardContent className="p-2">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-primary">{provider.title}</p>
              <p className="text-sm text-muted-foreground">
                {provider.subtitle}
              </p>
            </div>
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-yellow-700">
                {provider.rating}
              </span>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1 text-primary" />
            <span>{provider.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0 flex flex-col justify-between items-center border-t">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Award className="w-4 h-4 text-primary" />
            <span>{provider.experience}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 mr-1 text-primary" />
            <span>{provider.delivered}</span>
          </div>
        </div>
        <Button variant="default" size="sm" className="font-semibold">
          Book now
        </Button>
      </CardFooter>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="p-0">
            <Skeleton className="aspect-[4/3] w-full" />
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[100px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
              <Skeleton className="h-6 w-10" />
            </div>
            <Skeleton className="h-4 w-[120px] mt-2" />
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="space-y-1">
              <Skeleton className="h-3 w-[100px]" />
              <Skeleton className="h-3 w-[80px]" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-20" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
