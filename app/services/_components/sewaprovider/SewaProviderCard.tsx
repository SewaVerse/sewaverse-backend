import Image from "next/image";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const servicesData = [
  {
    title: "Child care | Night | Day",
    subtitle: "Guider for your child development",
    name: "Emma Clark",
    rating: 4.5,
    location: "Kathmandu",
    price: 2000,
    experience: "  5 Yrs Experience",
    Delivered:'100 Services Delivered',
    
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
    experience: "  5 Yrs Experience",
    Delivered:'100 Services Delivered',
    
   
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
    experience: "  5 Yrs Experience",
    Delivered:'100 Services Delivered',
  
    serviceIcon:  "/images/servicesImage/sewaproviderImage.svg",
    profile1: "/images/servicesImage/profile1.svg",
  },
  {
    title: "Child care | Night | Day",
    subtitle: "Professional babysitting",
    name: "Sophia Lee",
    rating: 4.9,
    location: "Kathmandu",
    price: 5000,
    experience: "  5 Yrs Experience",
    Delivered:'100 Services Delivered',
   
   
    serviceIcon: "/images/servicesImage/sewaproviderImage.svg",
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
                  {service.name}
                </h1>
                <p className="text-[12px] text-gray-700 md:text-sm  lg:text-sm">{service.title}</p>
                <p className="text-[12px] text-gray-700 md:text-sm  lg:text-sm">{service.subtitle}</p>

                <div className="flex items-center text-muted-foreground">
                  <FaLocationDot size={14} />
                  <p className="text-[12px]">{service.location}</p>
                </div>
              </div>
              <div>
                <span className="flex items-center gap-1  ">
                  <FaStar size={14} color="orange" />
                  <h1 className="text-sm">{service.rating}</h1>
                </span>
              </div>
            </div>
          </CardContent>

          <hr className="border-dotted" />

                 <div>
          <div className="flex items-center gap-10 md:gap-16 p-2 ">
          <span className="">
           
            <p className="text-muted-foreground text-[10px] md:text-sm ">{service.Delivered}</p>
            
            <p className="text-muted-foreground text-[10px] md:text-sm ">{service.experience}</p>
          </span>
          <div className="flex flex-col items-center gap-y-1  md:items-end md:gap-y-2 ">
          <FaRegHeart className=" text-[10px] md:text-sm  lg:text-lg"   />
            <Button variant="brand" size="sm" className="border-black hidden lg:block md:block  text-[10px]   md:text-sm  lg:text-sm">Book now</Button>
          </div>
          </div> 
            </div>
         
        </Card>
      ))}
    </div>
  );
}
