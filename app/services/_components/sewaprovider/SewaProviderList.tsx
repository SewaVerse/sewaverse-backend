import Image from "next/image";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

export const servicesData = [
  {
    title: "Child care | Night | Day",
    subtitle: "Guider for your child development",
    name: "Emma Clark",
    rating: 4.5,
    location: "Kathmandu",
    price: 2000,
    experience: "5 Yrs Experience",
    Delivered: "100 Services Delivered",
    start: "Joined in Jan, 2024",
    serviceIcon: "/images/servicesImage/sewaproviderImage.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Child care | Night | Day",
    subtitle: "Guider for your child development",
    name: "John Doe",
    rating: 4.8,
    price: 3000,
    location: "Lalitpur",
    experience: "5 Yrs Experience",
    Delivered: "100 Services Delivered",
    start: "Joined in Jan, 2024",
    serviceIcon: "/images/servicesImage/sewaproviderImage.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Child care | Night | Day",
    subtitle: "Guider for your child development",
    name: "Michel deo",
    rating: 4.2,
    location: "Bhaktapur",
    price: 4000,
    experience: "5 Yrs Experience",
    Delivered: "100 Services Delivered",
    start: "Joined in Jan, 2024",
    serviceIcon: "/images/servicesImage/sewaproviderImage.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Child care | Night | Day",
    subtitle: "Professional babysitting",
    name: "Sophia Lee",
    rating: 4.9,
    location: "Kathmandu",
    price: 5000,
    experience: "5 Yrs Experience",
    Delivered: "100 Services Delivered",
    start: "Joined in Jan, 2024",
    serviceIcon: "/images/servicesImage/sewaproviderImage.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Child care | Night | Day",
    subtitle: "Guider for your child development",
    name: "Michel deo",
    rating: 4.2,
    location: "Bhaktapur",
    price: 4000,
    experience: "5 Yrs Experience",
    Delivered: "100 Services Delivered",
    start: "Joined in Jan, 2024",
    serviceIcon: "/images/servicesImage/sewaproviderImage.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
];

const SewaProviderList = () => {
  return (
    <div className="h-[700px] overflow-y-scroll scrollable-container">
      {servicesData.map((service, index) => (
        <div
          key={index}
          className="w-[392px] mx-4 h-[120px] md:container md:mx-auto md:w-[1280px] md:h-[214px] lg:w-[1280px] lg:h-[214px] border-[1px] shadow-xl rounded mb-4"
        >
          <div className="flex items-center gap-2 md:items-start lg:items-start lg:gap-6">
            <div className="relative w-[80px] h-[120px] lg:w-[400px] lg:h-[214px]">
              <Image
                src={service.serviceIcon}
                alt="serviceIcon"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 bottom- rounded-md"
              />
            </div>

            <div className="lg:w-full lg:px-8 flex lg:justify-between lg:mt-4   relative">
              <div>
                <h1 className=" flex items-center  text-sm font-bold md:text-2xl lg:font-bold lg:text-3xl">
                  {service.name}{" "}
                  <FaStar
                    size={10}
                    color="orange"
                    className="ml-[1px] lg:hidden "
                  />
                  <span className="text-sm lg:hidden">4.5</span>
                </h1>
                <p className="text-[13px] md:text-lg lg:text-xl">
                  {service.title}{" "}
                </p>
                <p className="text-[13px] md:text-lg lg:text-xl">
                  {service.subtitle}
                </p>
                <div className="flex justify-between">
                  <span className="lg:p-1">
                    <p className="hidden lg:flex lg:items-center gap-1 lg:text-lg">
                      <FaStar size={14} color="orange" />
                      {service.rating}{" "}
                      <span className="text-muted-foreground">
                        (200 reviews)
                      </span>
                    </p>
                  </span>
                </div>
                <span className="flex items-center text-muted-foreground gap-1 text-sm">
                  <FaLocationDot size={14} />
                  <p>{service.location}</p>
                </span>
              </div>
              {/* middle */}

              {/* left side */}
              <div className="  flex lg:gap-10">
                <div className="w-[100px] h-[1px] bg-[#D7D7D7] rotate-90 mt-14 "></div>

                <div className=" mr-5 w-full text-[13px] md:text-2xl lg:text-xl">
                  <h1>{service.start}</h1>
                  <p>{service.Delivered}</p>
                  <p>{service.experience}</p>
                  <div className="flex items-center gap-1 mt-2 lg:hidden md:hidden">
                    <FaRegHeart size={16} />
                    <Button variant="brand" size="sm">
                      Book now
                    </Button>
                  </div>
                </div>
              </div>
              <div className=" hidden lg:absolute lg:left-[600px] lg:top-32 lg:flex gap-5 ">
                <Button variant="brand">
                  Add to Favourites <FaRegHeart size={12} />
                </Button>
                <Button variant="brand">Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SewaProviderList;
