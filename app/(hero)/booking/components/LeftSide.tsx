import { Separator } from "@radix-ui/react-separator";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OfferService {
  serviceTitle: string;
  slogan: string;
  serviceIcon: string;
  discountPrice: string;
  originalPrice: string;
  discountPercentage: string;
  description: string;
  extraInfo: string;
}

interface LeftSideProps {
  offerService: OfferService[];
}

const LeftSide = ({ offerService }: LeftSideProps) => {
  return (
    <div className="container mx-auto px-4">
      {offerService.map((data, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <div className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
              <HomeIcon className="h-4 w-4" />
              <RiArrowDropDownLine className="-rotate-90 h-5 w-5" />
              <span>Home Maintenance</span>
              <RiArrowDropDownLine className="-rotate-90 h-5 w-5" />
              <span className="font-medium gradient-text ">{data.slogan}</span>
            </div>

            <div className="mt-4 flex flex-col justify-between md:flex-row md:items-center">
              <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                {data.serviceTitle}
              </h1>
              {/* Optional: Add rating component here */}
            </div>
          </CardHeader>

          <CardContent>
            <div className="relative w-full overflow-hidden rounded-lg">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={data.serviceIcon}
                  alt={data.serviceTitle}
                  fill
                  className="rounded-lg object-cover"
                />
              </AspectRatio>

              {/* Navigation Arrows */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <button className="rounded-full bg-gray-100/80 p-2 shadow-sm transition-colors hover:bg-gray-200/90">
                  <RiArrowDropDownLine className="h-6 w-6 rotate-90" />
                </button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <button className="rounded-full bg-gray-100/80 p-2 shadow-sm transition-colors hover:bg-gray-200/90">
                  <RiArrowDropDownLine className="h-6 w-6 -rotate-90" />
                </button>
              </div>

              {/* Price Badge */}
              <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 lg:bottom-6 lg:left-6">
                <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <CardContent className="p-1 md:p-3">
                    <div className="space-y-0.5 md:space-y-1">
                      <p className="text-xs line-through text-muted-foreground md:text-sm">
                        Rs.{data.originalPrice}
                      </p>
                      <p className="text-sm font-bold ">
                        Rs.{data.discountPrice}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Discount Badge */}
              <div className="absolute right-4 top-4 ">
                <Badge
                  variant="destructive"
                  className="px-1 py-1 md:px-3 md:py-2 text-sm"
                >
                  {data.discountPercentage} OFF
                </Badge>
              </div>
            </div>

            {/* Description Section */}
            <Separator className="my-6" />
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">{data.description}</p>
              <p className="text-sm">{data.extraInfo}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeftSide;
