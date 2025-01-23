import Image from "next/image";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const servicesData = [
  {
    title: "Painting | Exterior | Interior",
    subtitle: "All kinds of painting work",
    name: "Emma Clark",
    rating: 4.5,
    location: "Kathmandu",
    offer: "30% OFF",
    price: 2000,
    discount: "Rs.25,000",
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
];

export function CardWithForm() {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {servicesData.map((service, index) => (
        <Card
          key={index}
          className="w-[300px] md:w-[300px] h-auto sm:h-[12vh] md:h-auto shadow-md rounded-lg overflow-hidden bg-white"
        >
          {/* Service Icon */}
          <div className="relative">
            <Image
              src={service.serviceIcon}
              alt={`${service.title} Icon`}
              width={250}
              height={100}
              className="rounded-t-lg object-contain w-full"
            />
            <div
              className={`absolute bottom-3 left-4 w-16 ${
                service.discount ? "h-9" : "h-7"
              } p-1 bg-blue-900 rounded flex items-center flex-col`}
            >
              {service.discount && (
                <p className="text-muted-foreground text-[10px] text-center line-through">
                  {service.discount}
                </p>
              )}
              <p className="text-white text-sm">Rs. {service.price}</p>
            </div>

            {/* for absolute */}
            {service.offer && (
              <div className="absolute top-0 right-12 w-[45px] h-[52px] bg-red-600 rounded-b-sm">
                <p className="text-white p-1">{service.offer}</p>
              </div>
            )}

            <FaRegHeart
              size={20}
              className=" absolute text-gray-300 bottom-2 right-6 text-lg  md:text-sm  lg:text-lg "
            />
          </div>

          {/* Card Content */}
          <CardContent className="p-2">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-gray-800">
                {service.title}
              </h1>
              <p className="text-sm text-gray-600">{service.subtitle}</p>
            </div>
          </CardContent>

          <hr className="border-dotted" />

          <div className="flex justify-between items-center md:justify-around text-[13px] md:text-lg p-1">
            <div className="flex items-center">
              <Image
                src={service.profile1}
                alt="profile1"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col">
                <h1>{service.name}</h1>
                <span className="flex items-center">
                  <FaLocationDot size={14} />
                  <p className="text-muted-foreground">{service.location}</p>
                </span>
              </div>

              <div>
                <span className="flex items-center gap-1 ">
                  <FaStar size={14} color="orange" />
                  <h1>{service.rating}</h1>
                </span>
              </div>
            </div>
            <div className="hidden md:block ml-2">
              <Button variant="brand">Book now</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
