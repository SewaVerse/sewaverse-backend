import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { SewaCardSkeleton } from "./SewaCardSkeleton";

// Interfaces
interface ServiceProvider {
  id: string;
  serviceProviderId: string;
  userId: string;
  name: string;
  email: string;
  profileId: string;
  providerType: string;
  isVerified: boolean;
  isAdminVerified: boolean;
  experiences?: string;
  deliveredServices?: number;
  totalServices?: number;
}

interface ProviderDetailsResponse {
  success: boolean;
  data: {
    data: ServiceProvider[];
  };
}

const fetchOfferedServices = async () => {
  const response = await axios.get("/api/public/offered-service");
  return response.data.data.data;
};

const fetchServiceProviders = async () => {
  const response = await axios.get<ProviderDetailsResponse>(
    "/api/public/service-provider"
  );
  return response.data.data.data.map((provider) => ({
    ...provider,
    experiences: `${Math.floor(Math.random() * 10)} years`,
    deliveredServices: Math.floor(Math.random() * 50),
    totalServices: Math.floor(Math.random() * 20),
  }));
};

export function SewaCard() {
  const [servicesQuery, providersQuery] = useQueries({
    queries: [
      {
        queryKey: ["offeredServices"],
        queryFn: fetchOfferedServices,
      },
      {
        queryKey: ["serviceProviders"],
        queryFn: fetchServiceProviders,
      },
    ],
  });

  // Loading state
  if (servicesQuery.isLoading || providersQuery.isLoading) {
    return <SewaCardSkeleton />;
  }

  // Error handling
  if (servicesQuery.error || providersQuery.error) {
    return (
      <div>
        Error: {servicesQuery.error?.message || providersQuery.error?.message}
      </div>
    );
  }

  // Enhance services with provider details
  const enhancedServices = servicesQuery.data?.map(
    (service: ServiceProvider) => {
      const provider = providersQuery.data?.find(
        (p) => p.id === service.serviceProviderId
      );
      return {
        ...service,
        providerExperience: provider?.experiences,
        deliveredServices: provider?.deliveredServices,
        totalServices: provider?.totalServices,
      };
    }
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {enhancedServices?.map(
        (
          service: ServiceProvider & {
            price: number;
            title: string;
            description: string;
            overallRating?: string;
            location?: string;
            serviceProvider: {
              name: string;
            };
          }
        ) => (
          <Card
            key={service.id}
            className="hover:shadow-lg transition-shadow max-w-lg"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/servicesImage/Mechanics.svg"
                  alt={service.title}
                  fill
                  className="object-cover h-60 rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    {/* <h3 className="font-semibold text-white text-xl mb-1">
                    {service.serviceProvider.name}
                  </h3> */}
                    <Badge className="bg-brand-gradient text-white">
                      Rs. {service.price}
                    </Badge>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          className="rounded-full bg-brand-gradient"
                        >
                          <Heart className="h-2 w-2" color="white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white rounded">
                        <p className="gradient-text text-xs font-medium p-1">
                          Add to favorites
                        </p>
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
                    <p className="text-sm font-semibold">{service.title}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium text-yellow-700">
                      {service.overallRating || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-2 pt-2 flex items-center justify-between border-t">
              {/* image and name  */}
              <div className="flex items-center gap-3">
                <div>
                  <Image
                    src="/images/servicesImage/Mechanics.svg"
                    alt={service.serviceProvider.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium text-xs">
                      {service.serviceProvider.name}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-3 h-3 " color="gray" />
                    <span className="font-medium text-xs">
                      {service.location ? service.location : "Location"}
                    </span>
                  </div>
                </div>
              </div>

              <Button variant="brand" size="sm" className="font-semibold">
                Book now
              </Button>
            </CardFooter>
          </Card>
        )
      )}
    </div>
  );
}

export default SewaCard;
