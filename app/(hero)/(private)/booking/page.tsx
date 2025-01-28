// page.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import { OfferedService } from "@/lib/types";

import BookingForm from "./components/BookingForm";
import OfferedServiceDetails from "./components/OfferedServiceDetails";
import ProfileCard from "./components/ProfileCard";

const fetchOfferedService = async (id: string): Promise<OfferedService> => {
  const { data } = await axios.get(`/api/public/offered-service/${id}`);
  return data.data;
};

const Page = () => {
  const searchParams = useSearchParams();
  const offeredServiceId = searchParams.get("id");

  const {
    data: offerService,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offeredService", offeredServiceId],
    queryFn: () => fetchOfferedService(offeredServiceId!),
    enabled: !!offeredServiceId,
  });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div>Error loading service details</div>;
  }

  if (!offerService) {
    return <div>No service found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Offered Service Details (Big Section) */}
        <div className="lg:w-2/3">
          <OfferedServiceDetails offerService={offerService} />
        </div>

        {/* Side Section (Profile Card and Booking Form) */}
        <div className="lg:w-1/3 flex flex-col gap-8">
          <ProfileCard
            profileId={offerService.serviceProvider.profileId}
            providerName={offerService.serviceProvider.name}
            joinedDate={offerService.serviceProvider.createdAt}
          />
          <BookingForm
            serviceTitle={offerService.title}
            offeredServiceId={offerService.id}
            location={offerService.location ?? undefined}
            price={offerService.price}
            priceType={offerService.priceType}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
