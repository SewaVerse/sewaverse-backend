import Image from "next/image";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

export const servicesData = [
  {
    title: "Painting | Exterior | Interior",
    subtitle: "All kinds of painting work",
    name: "Emma Clark",
    rating: 4.5,
    location: "Kathmandu",
    discount: "Rs.25,000",
    price: 10000,
    serviceIcon: "/images/servicesImage/Beautician.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Plumbing Services",
    subtitle: "Expert plumbing work",
    name: "John Doe",
    rating: 4.8,
    price: 3000,
    location: "Lalitpur",
    serviceIcon: "/images/servicesImage/HomeWater.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Mechanic Services",
    subtitle: "Car and bike repairs",
    name: "Michel deo",
    rating: 4.2,
    location: "Bhaktapur",
    price: 4000,
    serviceIcon: "/images/servicesImage/Mechanics.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Childcare Services",
    subtitle: "Professional babysitting",
    name: "Sophia Lee",
    rating: 4.9,
    location: "Kathmandu",
    price: 5000,
    serviceIcon: "/images/servicesImage/Childcare.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Childcare Services",
    subtitle: "Professional babysitting",
    name: "Sophia Lee",
    rating: 4.9,
    location: "Kathmandu",
    price: 5000,
    serviceIcon: "/images/servicesImage/Childcare.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Childcare Services",
    subtitle: "Professional babysitting",
    name: "Sophia Lee",
    rating: 4.9,
    location: "Kathmandu",
    price: 5000,
    serviceIcon: "/images/servicesImage/Childcare.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
];

const SewaList = () => {
  return (
    <div className="h-[700px] overflow-y-scroll scrollable-container">
      {servicesData.map((service, index) => (
        <div
          key={index}
          className="w-[392px] mx-4 h-[100px] md:container md:mx-auto md:w-[1280px] md:h-[214px] lg:w-[1280px] lg:h-[214px] border-[1px] shadow-xl rounded mb-4"
        >
          <div className="flex items-center gap-2 md:items-start lg:items-start lg:gap-6">
            <div className="relative w-[80px] h-[100px] lg:w-[390px] lg:h-[214px]">
              <Image
                src={service.serviceIcon}
                alt="serviceIcon"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 bottom- rounded-t-r-sm"
              />
            </div>
            <div
              className="
            absolute left-16   lg:hidden md:hidden "
            >
              <FaRegHeart size={20} color="white" />
            </div>

            <div className="lg:w-full lg:px-8">
              <h1 className="text-sm font-bold md:text-2xl lg:font-bold lg:text-3xl">
                {service.title}
              </h1>
              <p className="text-[13px] md:text-lg lg:text-xl">
                {service.subtitle}
              </p>
              <div className="flex justify-between">
                <span className="p-1">
                  <p className="hidden lg:flex lg:items-center gap-1 lg:text-lg">
                    <FaStar size={14} color="orange" />
                    {service.rating}{" "}
                    <span className="text-muted-foreground">(200 reviews)</span>
                  </p>
                </span>
                <div>
                  <h1 className="hidden text-sm lg:text-2xl lg:block text-muted-foreground line-through ">
                    {service.discount}
                  </h1>
                  <h1 className="hidden text-sm lg:text-3xl lg:block font-bold">
                    Rs. {service.price}
                  </h1>
                </div>
              </div>

              <hr className="hidden lg:block lg:border-dotted border-[1px] lg:mt-1" />

              <div className="lg:mt-2 flex items-center gap-2">
                <Image
                  src={service.profile1}
                  alt="profile1"
                  width={60}
                  height={60}
                  className="hidden lg:block md:block"
                />
                <div className="lg:text-sm flex items-center lg:justify-between w-full">
                  <div className="flex items-start gap-10">
                    <div>
                      <p>{service.name}</p>
                      <span className="flex items-center gap-1 text-muted-foreground text-[13px]">
                        <FaLocationDot size={17} />
                        <p>{service.location}</p>
                      </span>
                    </div>
                    <p className="flex items-center gap-1">
                      <FaStar size={14} color="orange" />
                      {service.rating}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="hidden lg:flex lg:gap-3 lg:items-center">
                    <Button variant="brand">
                      Add to Wishlist <FaRegHeart size={12} />
                    </Button>
                    <Button variant="brand">Book now</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-auto px-2 ml-3 bg-[#023994CC] text-sm font-bold text-white rounded-sm lg:hidden">
              <h1>Package From:</h1>
              <p>Rs. {service.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SewaList;
