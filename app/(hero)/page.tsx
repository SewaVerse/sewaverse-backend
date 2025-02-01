import {
  BugIcon,
  Building2Icon,
  CarIcon,
  ChevronDown,
  ComputerIcon,
  HomeIcon,
  PawPrintIcon,
  ScissorsIcon,
  SparklesIcon,
  TruckIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import FeaturedSewa from "@/components/home/FeaturedSewa";
import ImageSlider from "@/components/home/ImageSlider";
import PopularSewa from "@/components/home/PopularSewa";

const imagesData = [
  {
    id: 1,
    icon: <HomeIcon size={44} color="#2E3192" />,
    name: "Home Maintenance",
  },
  {
    id: 2,
    icon: <Building2Icon size={44} color="#2E3192" />,
    name: "Construction",
  },
  {
    id: 3,
    icon: <ComputerIcon size={44} color="#2E3192" />,
    name: "Computer Repair & Maintenance",
  },
  {
    id: 4,
    icon: <ScissorsIcon size={44} color="#2E3192" />,
    name: "Beauty & Personal Care (Female)",
  },
  {
    id: 6,
    icon: <CarIcon size={44} color="#2E3192" />,
    name: "Auto Repair & Maintenance",
  },
  { id: 7, icon: <TruckIcon size={44} color="#2E3192" />, name: "Mover" },

  { id: 9, icon: <PawPrintIcon size={44} color="#2E3192" />, name: "Pet Care" },
  { id: 10, icon: <BugIcon size={44} color="#2E3192" />, name: "Pest Control" },
  {
    id: 11,
    icon: <SparklesIcon size={44} color="#2E3192" />,
    name: "Pandit & Jyotish",
  },
  {
    id: 12,
    icon: <HiOutlineDotsHorizontal size={44} color="#2E3192" />,
    name: "All Sewas",
  },
];

const Home = async () => {
  const menuItems = [
    { src: "/images/painting.svg", alt: "logo", label: "Painting" },
    { src: "/images/cleaning.svg", alt: "logo", label: "Cleaning" },
    { src: "/images/babysitting.svg", alt: "logo", label: "Baby Sitting" },
    { src: "/images/beautician.svg", alt: "logo", label: "Beautician" },
    { src: "/images/hair.svg", alt: "logo", label: "Hair Stylist" },

    { src: "/images/it.svg", alt: "logo", label: "Machine" },

    { src: "/images/it.svg", alt: "logo", label: "Machine" },
    { src: "/images/it.svg", alt: "logo", label: "Laptop" },

    { src: "/images/beautician.svg", alt: "logo", label: "Beautician" },

    { src: "", alt: "", label: "More" },
  ];

  return (
    <div className="font-poppins font-medium text-xl min-h-screen">
      <div className="hidden md:block absolute top-12 left-0 right-0 z-10 px-16  mt-2">
        <div className="py-4 rounded-t-md my-4 bg-black bg-opacity-25 ">
          <ul className="flex flex-row justify-between space-x-6 px-1">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-white text-lg font-medium hover:underline"
              >
                {item.src && (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={23}
                    height={23}
                    color="red"
                  />
                )}
                {item.label}

                <ChevronDown style={{ width: "19px", height: "16px" }} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className=" w-full h-[20rem] mb-2 mt-1 md:block hidden">
        <ImageSlider />
      </div>

      <div className="mx-16">
        <FeaturedSewa />
        <PopularSewa />

        <div className="py-16 bg-white text-center overflow-hidden  ">
          <div className="relative h-[80vh] w-full">
            {/* Background Image */}
            <div className="absolute inset-0 rounded-[20px]  border-4 border-white">
              <Image
                src="/images/1m.jpg"
                alt="Homepage background"
                className="object-cover w-full h-full"
                fill
                priority
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Content */}
            <div className="absolute z-10 flex flex-col justify-center h-full px-10">
              <div className="absolute top-8 left-8 text-xs md:text-xl font-semibold tracking-wide text-white">
                Sewaverse
              </div>

              <div className="text-left text-white max-w-xl mt-16 md:mt-24">
                {" "}
                <h1 className="text-base md:text-3xl font-bold leading-tight ">
                  A Comprehensive & Innovative Service Marketplace
                </h1>
                {/* Description */}
                <p className="hidden md:block md:text-2xl leading-relaxed mt-12 ">
                  Offer or Receive Sewa with Ease and Convenience.
                </p>
              </div>

              {/* Cards Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8 md:mt-20">
                {/* Card 1 */}
                <div className="bg-[#023994CC] p-2 md:p-6 rounded-md shadow-md cursor-pointer text-white hover:bg-[#021f77] transition duration-300">
                  <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2 text-center">
                    Book the service
                  </h3>
                  <p className="text-sm md:text-base text-center">
                    Find the right expert{" "}
                    <span className="text-lg ml-2 font-bold">→</span>
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-[#023994CC] p-2 md:p-6 rounded-md shadow-md cursor-pointer text-white hover:bg-[#021f77] transition duration-300">
                  <h3 className="text-sm md:text-xl font-semibold mb-2 text-center">
                    Become a Sewa Provider
                  </h3>
                  <p className="text-sm md:text-base text-center">
                    Start providing services{" "}
                    <span className="text-sm ml-2 font-bold">→</span>
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-[#023994CC] p-2 md:p-6  rounded-md shadow-md cursor-pointer text-white hover:bg-[#021f77] transition duration-300">
                  <h3 className="text-sm md:text-xl font-semibold mb-2 text-center">
                    Learn more about Sewaverse
                  </h3>
                  <p className="text-sm md:text-base text-center">
                    More about us{" "}
                    <span className="text-sm ml-2 font-bold">→</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sewa Categories */}

        <div className="pb-16 bg-white text-center">
          <h2 className="text-3xl font-bold mb-8 font-poppins">
            Sewa Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {imagesData.map((service) => (
              <div
                key={service.id}
                className="border rounded-md border-gray-200 flex flex-col gap-2 md:gap-4 items-center justify-center py-4 md:py-8 lg:py-12 px-4 md:px-6"
              >
                {React.cloneElement(service.icon, {
                  size: "32", // Default size
                  className: "w-8 h-8 md:w-10 md:h-10",
                })}
                <p className="text-sm md:text-base text-primary text-center">
                  {service.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* other section  */}
        <div className="pb-16 bg-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 font-poppins">
            Don’t Just Take Our Word, Trust the Real Stories <br />
            <span className="text-base font-normal leading-[24px] text-center decoration-skip-ink-none">
              Real Experiences, Real Insites
            </span>
          </h3>

          <div className="relative flex flex-col items-center">
            <div className="relative z-20 bg-white rounded-lg shadow-2xl border border-white/50 w-full md:w-[550px] h-auto md:h-[380px] p-6">
              <Image
                src="/images/profileimage1.svg"
                alt="Marinda Walkers"
                className="w-16 h-16 rounded-full mx-auto mt-4 border-4 border-white"
                width={638}
                height={497}
              />
              <p className="mt-12 text-gray-600 text-[16px] font-poppins font-normal leading-[24px] text-justify decoration-skip-ink-none">
                {`I’ve used Serwaverse for a variety of services, from home
        cleaning to graphic design, and overall, I've been very
        impressed. The range of services is extensive, and the quality
        is generally high. My only gripe is that the service reviews can
        sometimes be a bit inconsistent. Still, it’s a fantastic
        resource for all kinds of needs.`}
              </p>

              <div className="mt-6 text-gray-900 font-bold">
                Jackson Hopkins <br />
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
            </div>

            <div className="hidden md:flex absolute justify-between w-full top-5 px-4">
              <div className="relative z-10 bg-gray-50 rounded-lg shadow-lg border border-gray-200/50 w-full md:w-[600px] h-auto md:h-[350px] opacity-50 p-6 translate-y-[70px]">
                <Image
                  src="/images/profileimage3.svg"
                  alt="Jackson Hopkins"
                  className="w-16 h-16 rounded-full mx-auto mt-4 border-4 border-white"
                  width={638}
                  height={497}
                />
                <p className="mt-12 text-gray-600 text-sm">
                  I’ve used Servaverse for a variety of services, from home
                  cleaning to graphic design, and overall, I’ve been very
                  impressed...
                </p>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-700 font-semibold">
                  Marinda Walkers <br />
                  <span className="text-yellow-400">⭐⭐⭐⭐</span>
                </div>
              </div>

              <div className="relative z-10 bg-gray-50 rounded-lg shadow-lg border border-gray-200/50 w-full md:w-[600px] h-auto md:h-[350px] opacity-50 p-6 translate-y-[70px]">
                <Image
                  src="/images/profileimage2.svg"
                  alt="Jensony Kennedy"
                  className="w-16 h-16 rounded-full mx-auto mt-4 border-4 border-white"
                  width={638}
                  height={497}
                />
                <p className="mt-12 text-gray-600 text-sm">
                  This service has been a game-changer for me! From booking a
                  plumber to finding last-minute help...
                </p>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-700 font-semibold">
                  Jensony Kennedy <br />
                  <span className="text-yellow-400">⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
