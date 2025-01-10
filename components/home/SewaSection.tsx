"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "../ui/button";

type TSewaCard = {
  title: string;
  description: string;
  image: string;
  price: string;
  originalPrice: string;
  discount: string | null;
  name: string;
  rating: number;
};

type SewaSectionProps = {
  name: string;
  cateogryNames: {
    id: number;
    name: string;
  }[];
  details: TSewaCard[];
};

const SewaSection: React.FC<SewaSectionProps> = ({
  name,
  cateogryNames,
  details,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(cateogryNames[0].id);
  return (
    <>
      <div className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">{name}</h2>
        <div className="flex sm:flex-row flex-col justify-between items-center px-4 w-full">
          <ChevronLeft style={{ color: "#D9D9D9" }} />
          {cateogryNames.map((category) => (
            <Button
              variant={"brand"}
              key={category.id}
              className={clsx(
                "mt-2 shadow-md hover:shadow-lg px-8 py-4 w-48",
                selectedCategory !== category.id && "bg-white text-black",
                selectedCategory === category.id && "scale-y-110",
                "sm:m-0 m-2"
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
          <ChevronRight style={{ color: "#D9D9D9" }} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <ChevronLeft style={{ color: "#D9D9D9" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 col-auto">
          {details.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  src={service.image}
                  alt={`Featured Service ${index + 1}`}
                  className="w-full h-[280px] object-cover rounded-t-lg"
                  width={310}
                  height={20}
                />
                {service.discount && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg">
                    {service.discount} OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg">{service.title}</h4>
                <p className="text-gray-500 text-sm">{service.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#D9D9D9] text-xl">
                    ------------------------------------------
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex gap-4">
                    <Image
                      src="/images/profileimage1.svg"
                      className="w-6 h-6 rounded-full"
                      alt="user"
                      width={10}
                      height={10}
                    />
                    <div className="text-gray-700 flex flex-col">
                      {service.name}
                      <span className="flex items-center text-[#878787]">
                        <MapPin className="text-zinc-500 h-4" />
                        <span style={{ color: "#878787" }}>Kathmandu</span>
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center">
                    <span className="text-gray-700">{service.rating}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill text-yellow-400 ml-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.387.198-.85-.182-.716-.623l.857-2.81-2.18-1.621c-.366-.268-.213-.766.288-.8l2.948-.211L7.74.38c.178-.57.83-.57 1.01 0l1.463 4.22 2.948.211c.502.034.654.532.288.8l-2.18 1.62.857 2.81c.134.441-.329.821-.716.623l-2.444-1.705-2.443 1.705z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ChevronRight style={{ color: "#D9D9D9" }} />
      </div>
    </>
  );
};

export default SewaSection;
