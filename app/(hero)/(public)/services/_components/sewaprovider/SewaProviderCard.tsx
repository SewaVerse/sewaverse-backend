"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLocationDot, FaRegHeart, FaStar } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ServiceProviderCard() {
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/public/service-provider?page=1&limit=10"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.warn("Fetched Data:", data); // Console log the API data
        setServicesData(data?.data?.items || []); // Update the state with fetched data
      } catch (error) {
        console.error(error);
        setError(error.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {servicesData.map((service: any, index: number) => (
        <Card
          key={index}
          className="w-[300px] md:w-[300px] h-auto sm:h-[12vh] md:h-auto shadow-md rounded-lg overflow-hidden bg-white"
        >
          {/* Service Icon */}
          <div className="relative">
            <Image
              src={
                service.serviceIcon ||
                "/images/servicesImage/sewaproviderImage.svg"
              }
              alt={`${service.title} Icon`}
              width={250}
              height={100}
              className="rounded-t-lg object-contain w-full"
            />
            <div className="absolute bottom-0 left-4 w-16 h-7 p-1 bg-blue-900 rounded">
              <p className="text-white text-sm text-center">
                Rs. {service.price}
              </p>
            </div>
          </div>

          {/* Card Content */}
          <CardContent className="p-1">
            <div className="flex items-baseline md:gap-14 lg:gap-12 ">
              <div className="flex flex-col">
                <h1 className="text-sm font-semibold text-gray-800">
                  {service.name || "Unknown"}
                </h1>
                <p className="text-[12px] text-gray-700 md:text-sm  lg:text-sm">
                  {service.title || "Service Title"}
                </p>
                <p className="text-[12px] text-gray-700 md:text-sm  lg:text-sm">
                  {service.subtitle || "Service Subtitle"}
                </p>

                <div className="flex items-center text-muted-foreground">
                  <FaLocationDot size={14} />
                  <p className="text-[12px]">
                    {service.location || "Unknown Location"}
                  </p>
                </div>
              </div>
              <div>
                <span className="flex items-center gap-1  ">
                  <FaStar size={14} color="orange" />
                  <h1 className="text-sm">{service.rating || "N/A"}</h1>
                </span>
              </div>
            </div>
          </CardContent>

          <hr className="border-dotted" />

          <div>
            <div className="flex items-center gap-10 md:gap-16 p-2 ">
              <span className="">
                <p className="text-muted-foreground text-[10px] md:text-sm ">
                  {service.Delivered || "N/A"}
                </p>

                <p className="text-muted-foreground text-[10px] md:text-sm ">
                  {service.experience || "N/A"}
                </p>
              </span>
              <div className="flex flex-col items-center gap-y-1  md:items-end md:gap-y-2 ">
                <FaRegHeart className=" text-[10px] md:text-sm  lg:text-lg" />
                <Button
                  variant="brand"
                  size="sm"
                  className="border-black hidden lg:block md:block  text-[10px]   md:text-sm  lg:text-sm"
                >
                  Book now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
