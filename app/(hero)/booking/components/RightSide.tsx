import { RiStarFill } from "react-icons/ri";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import BookingForm from "./BookingForm";

interface RightSideProps {
  profileData: {
    name: string;

    profession: string;

    rating: number;

    profile: string;

    start: string;

    Delivered: string;

    experience: string;
  };
}

const RightSide = ({ profileData }: RightSideProps) => {
  return (
    <div className="space-y-6 px-4">
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center justify-center">
            {/* Profile Section */}
            <div className="flex flex-1 flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-2 ring-primary ring-offset-2">
                  <AvatarImage
                    src={profileData.profile}
                    alt={profileData.name}
                  />
                  <AvatarFallback>{profileData.name[0]}</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 gap-1 px-2 py-1">
                  <RiStarFill className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{profileData.rating}</span>
                </Badge>
              </div>

              <div className="text-center">
                <h2 className="text-lg font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">
                  {profileData.profession}
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="hidden md:block" />
            <Separator className="md:hidden" />

            {/* Stats Section */}
            <div className="flex-1 ">
              <dl className="">
                {[
                  { value: profileData.start },
                  { value: profileData.Delivered },
                  { value: profileData.experience },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col mb-1 items-center justify-center rounded-lg bg-muted/50 p-2 transition-colors hover:bg-muted"
                  >
                    <dd className="text-center text-sm font-semibold">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Form */}
      <BookingForm />
    </div>
  );
};

export default RightSide;
