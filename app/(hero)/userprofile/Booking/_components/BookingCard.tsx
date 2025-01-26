import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const SewaverseIcon = "/images/servicesImage/SewaVerse.svg";

interface Booking {
  date: {
    day: string;
    dayNum: number;
    month: string;
    year: number;
  };
  time: {
    start: string;
    end: string;
  };
  service: {
    title: string;
    bookingId: string;
    provider: string;
    location: string;
  };
  status: "Completed" | "Ongoing" | "Cancelled";
  price: number;
}

interface BookingCardProps extends Booking {}

const BookingCard: React.FC<BookingCardProps> = ({
  date,
  time,
  service,
  status,
  price,
}) => {
  return (
    <div className="w-full md:h-40 rounded-lg border shadow-md mt-5">
      <div className="md:flex gap-10 p-3">
        <div
          className={` ${
            status === "Completed"
              ? "text-green-500"
              : status === "Ongoing"
              ? "gradient-text"
              : status === "Cancelled"
              ? "text-red-500"
              : "text-black"
          } justify-between basis-1/6 items-center md:border-dashed md:border-r-[2px] flex md:flex-col border-b-[2px] md:border-b-0 mb-2`}
        >
          <div className="flex items-start justify-center gap-2 md:flex-col md:gap-0">
            <div className="text-center flex flex-col-reverse md:block">
              <h1 className="md:text-xl text-center ">{date.day}</h1>
              <h1 className="md:text-5xl font-semibold">{date.dayNum}</h1>
            </div>
            <div className="text-start">
              <p className="md:text-base">{`${date.month} ${date.year}`}</p>
              <p className="md:text-sm text-black">{`${time.start} - ${time.end}`}</p>
            </div>
          </div>
          <div>
            <p
              className={`block md:hidden ${
                status === "Completed"
                  ? "text-green-500"
                  : status === "Ongoing"
                  ? "gradient-text"
                  : status === "Cancelled"
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              {status}
            </p>
          </div>
        </div>

        <div className="flex-1 py-2">
          <div className="flex gap-1 md:justify-between">
            <Link href={"/userprofile/Booking/1/cancel"}>
              <div className="md:basis-5/6 flex flex-col items-start ">
                <h1 className="md:text-3xl text-base font-semibold">{service.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Booking Id: {service.bookingId}
                </p>
                <div className="flex items-center">
                  <Image
                    src={SewaverseIcon}
                    alt="SewaVerse"
                    height={30}
                    width={30}
                  />
                  <p className="text-base">{service.provider}</p>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={15} />
                  <p className="text-base">{service.location}</p>
                </div>
              </div>
            </Link>
            <div className=" mt-2 ml-20 md:ml-0">
              <p
                className={`hidden md:block ${
                  status === "Completed"
                    ? "text-green-500"
                    : status === "Ongoing"
                    ? "gradient-text"
                    : status === "Cancelled"
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                {status}
              </p>
              <p className="md:text-2xl font-semibold block md:hidden ">
                Rs. {price.toLocaleString()}
              </p>

              <p className="text-2xl font-semibold hidden md:block mt-2">
                Rs. {price.toLocaleString()}
              </p>
              {status === "Completed" && (
                <div className="flex gap-2 -ml-28 mt-5 md:mt-0  ">
                  <Button
                    variant={"brand"}
                    size={"sm"}
                    className="w-[100px] mt-10 md:mt-2"
                  >
                    Review again
                  </Button>
                  <Button
                    variant={"brand"}
                    size={"sm"}
                    className="w-[100px] mt-10 md:mt-2"
                  >
                    Rebook
                  </Button>
                </div>
              )}

              {status === "Ongoing" && (
                <div className="flex gap-2 -ml-28 mt-5 md:mt-0  ">
                  <Button
                    variant={"brand"}
                    size={"sm"}
                    className="md:w-[100px] mt-10 md:mt-2"
                  >
                    Re-schedule
                  </Button>
                  <Button
                    variant={"brand"}
                    size={"sm"}
                    className="w-[100px] mt-10 md:mt-2"
                  >
                    pay Now
                  </Button>
                </div>
              )}
              {status === "Cancelled" && (
                <div className="flex gap-2  md:ml-0 ">
                  <Button
                    variant={"brand"}
                    size={"sm"}
                    className="w-[100px] mt-10 md:mt-2"
                  >
                    Rebook
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
