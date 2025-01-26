import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const SewaverseIcon = "/images/servicesImage/SewaVerse.svg";
const BookingCard = () => {
  return (
    <div className=" w-full md:h-40  rounded-lg border shadow-md  mt-5 ">
      <div className="md:flex gap-10  p-3">
        <div className="text-green-500 justify-between  basis-1/6  items-center  md:border-dashed md:border-r-[2px] flex md:flex-col border-b-[2px] md:border-b-0 mb-2 ">
          <div className="flex items-start justify-center gap-2 md:flex-col md:gap-0 ">
            <div className=" text-start">
              {" "}
            
              <h1 className="md:text-xl text-start">MON</h1>
              <h1 className="md:text-5xl font-semibold">28</h1>
            </div>
            <div className="text-start">
              {" "}
           
              <p className="md:text-base">Jan 2025</p>
              <p className="md:text-sm text-black">3pm-10pm</p>
            </div>
          </div>

          <div>
            <Link href={"/userprofile/review/1/reviewdetails"}>
              <Button
                variant={"brand"}
                size={"sm"}
                className="h-5 block md:hidden"
              >
                View Review{" "}
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 py-2">
          <div className="flex gap-1 md:justify-between">
            <div className="basis-5/6  flex flex-col items-start w-[500px]  ">
              <h1 className="text-3xl font-semibold">
                Exterior House Painting
              </h1>
              <p className="text-sm text-muted-foreground">
                Booking Id: 23231313123
              </p>
              <div className="flex items-center ">
                <Image
                  src={SewaverseIcon}
                  alt="SewaVerse"
                  height={30}
                  width={30}
                />
                <p className="text-base">Sewaverse Nepal</p>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={15} />
                <p className="text-base">Chabahil, Kathmandu</p>
              </div>
            </div>
            <div className=" -ml-5 md:ml-0">
              <Link href={"/userprofile/review/1/reviewdetails"}>
                <Button
                  variant={"brand"}
                  size={"sm"}
                  className="h-5 hidden md:block"
                >
                  View Review{" "}
                </Button>
                <p className="md:text-2xl font-semibold block md:hidden mt-10   ">
                  Rs. 20,000
                </p>
              </Link>
              <p className="text-2xl font-semibold hidden md:block mt-2">
                Rs. 20,000
              </p>
              <Button
                variant={"brand"}
                size={"sm"}
                className="w-[100px] mt-10 md:mt-2"
              >
                Rebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
