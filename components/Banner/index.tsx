"use client";

import appleStore from "../../assets/images/apple-store.svg";
import banner from "../../assets/images/banner.svg";
import googlePlay from "../../assets/images/google-play.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const banners = [
  {
    image: banner,
  },
  {
    image: banner,
  },
  {
    image: banner,
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative w-full h-[600px]">
      <div className="absolute inset-0">
        <Image
          src={banners[activeIndex].image}
          alt="Banner Background"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <div className="absolute top-4 left-8">
          <nav className="flex space-x-4">
            <a href="#" className="flex items-center">
              <span className="material-icons">format_paint</span>
              <span>Painting</span>
            </a>
            <a href="#" className="flex items-center">
              <span className="material-icons">cleaning_services</span>
              <span>Cleaning</span>
            </a>
            <a href="#" className="flex items-center">
              <span className="material-icons">child_care</span>
              <span>Baby Sitting</span>
            </a>
            <a href="#" className="flex items-center">
              <span className="material-icons">spa</span>
              <span>Beautician</span>
            </a>
            <a href="#" className="flex items-center">
              <span className="material-icons">content_cut</span>
              <span>Hair Stylist</span>
            </a>
            <a href="#" className="flex items-center">
              <span className="material-icons">support_agent</span>
              <span>IT Support</span>
            </a>
            <a href="#" className="flex items-center">
              <span>More</span>
              <span className="material-icons">expand_more</span>
            </a>
          </nav>
        </div>
        <div className="absolute top-48 left-8 w-[500px] text-start">
          <h1 className="text-[40px] font-bold">
            Welcome to the Universe of Sewaverse
          </h1>

          <p className="mt-4 text-lg">
            Seamlessly offer or receive services simply, conveniently, and with
            ease.
          </p>

          <Button className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Get Started
          </Button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer transition-colors ${
                index === activeIndex ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4 flex space-x-4">
        <a>
          <Image src={googlePlay} alt="Play Store" className="w-8 h-8" />
        </a>
        <a>
          <Image src={appleStore} alt="App Store" className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default Banner;
