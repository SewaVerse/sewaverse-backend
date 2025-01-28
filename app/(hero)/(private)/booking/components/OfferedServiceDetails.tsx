import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { FaHandHolding } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OfferedService } from "@/lib/types";

interface OfferedServiceDetailsProps {
  offerService: OfferedService;
}

const OfferedServiceDetails = ({
  offerService,
}: OfferedServiceDetailsProps) => {
  return (
    <div className="container mx-auto w-full max-w-7xl">
      <Card className="w-full">
        <CardHeader>
          {/* Service Name Section */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
            <FaHandHolding className="h-4 w-4" />
            <RiArrowDropDownLine className="-rotate-90 h-5 w-5" />
            <span className="font-medium gradient-text">
              {offerService.service.name}
            </span>
          </div>

          {/* Title and Verified Badge Section */}
          <div className="mt-4 flex flex-col justify-between md:flex-row md:items-center">
            <h1 className="text-xl font-semibold tracking-tight lg:text-3xl">
              {offerService.title}
              {offerService.adminVerified && (
                <span className="ml-2 text-xs text-green-500 bg-green-100 rounded-full px-2 py-1">
                  <MdVerified className="inline-block mr-1" /> Verified
                </span>
              )}
            </h1>
          </div>
        </CardHeader>

        <CardContent>
          {/* Image Section */}
          <div className="relative w-full overflow-hidden rounded-lg">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={"/images/servicesImage/Mechanics.svg"}
                alt={offerService.title}
                fill
                className="rounded-lg object-cover"
              />
            </AspectRatio>

            {/* Navigation Arrows */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <button className="rounded-full bg-gray-100/80 p-1 md:p-2 shadow-sm transition-colors hover:bg-gray-200/90">
                <RiArrowDropDownLine className="h-4 w-4 md:h-6 md:w-6 rotate-90" />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button className="rounded-full bg-gray-100/80 p-1 md:p-2 shadow-sm transition-colors hover:bg-gray-200/90">
                <RiArrowDropDownLine className="h-4 w-4 md:h-6 md:w-6 -rotate-90" />
              </button>
            </div>

            {/* Price Card */}
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 lg:bottom-6 lg:left-6">
              <Card className="bg-brand-gradient border-none">
                <div className="p-1 md:p-2">
                  <p className="text-xs md:text-sm font-bold text-white">
                    Rs. {offerService.price}/{offerService.priceType}
                  </p>
                </div>
              </Card>
            </div>

            {/* Discount Badge */}
            <div className="absolute right-2 top-2 md:right-4 md:top-4 lg:right-6 lg:top-6">
              <Badge variant="destructive" className="text-xs md:text-sm">
                {offerService.discount ? offerService.discount : 0}% OFF
              </Badge>
            </div>
          </div>

          {/* Separator */}
          <Separator className="my-6" />

          {/* Description Section */}
          <div className="space-y-4 text-muted-foreground">
            <p className="text-sm md:text-base leading-relaxed">
              {offerService.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfferedServiceDetails;
