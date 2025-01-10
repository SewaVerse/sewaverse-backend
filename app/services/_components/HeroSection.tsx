"use client";
import Image from "next/image";
import { useState } from "react";
import { GoArrowDown } from "react-icons/go";
import { IoGridOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";

import FilterSection from "./FilterSection";
import SewaList from "./sewa/SewaList";
import SewaSection from "./sewa/SewaSection";
import SewaProvider from "./sewaprovider/SewaProvider";
import SewaProviderList from "./sewaprovider/SewaProviderList";

export const heroData = {
  filterList: "/images/servicesImage/filter-list.svg",
};

const HeroSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"sewa" | "sewaprovider">("sewa");

  const [activestate, setActiveState] = useState<"list" | "grid">("grid");

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="md:ml-10 lg:ml-10">
      {/* Hero Section */}
      <div className="flex justify-around items-center mt-2">
        <h1
          onClick={() => setActiveTab("sewa")}
          className={`text-[12px] lg:text-[18px] cursor-pointer ${
            activeTab === "sewa" ? "gradient-text font-bold" : "text-gray-500"
          }`}
        >
          Sewa
        </h1>
        <h1
          onClick={() => setActiveTab("sewaprovider")}
          className={`text-[12px] lg:text-[18px] cursor-pointer ${
            activeTab === "sewaprovider"
              ? "gradient-text font-bold"
              : "text-gray-500"
          }`}
        >
          Sewa Provider
        </h1>
      </div>
      <div className="flex items-center justify-between gap-2 px-16">
        {/* Sewa Tab */}
        <div
          className={`h-[2px] ${
            activeTab === "sewa" ? "bg-brand" : "bg-gray-200"
          } w-full hidden md:block lg:block ${
            activeTab === "sewa" ? "block" : "hidden"
          }`}
        ></div>

        {/* Sewa Provider Tab */}
        <div
          className={`h-[2px] ${
            activeTab === "sewaprovider" ? "bg-brand" : "bg-gray-200"
          } w-full hidden md:block lg:block ${
            activeTab === "sewaprovider" ? "block" : "hidden"
          }`}
        ></div>
      </div>

      {/* SubHero Section */}
      <div>
        <span className="flex items-center justify-between text-[12px] px-2 py-2 md:px-16 md:text-base text-muted-foreground">
          <h1 className="flex items-center">
            Best match
            <RiArrowDropDownLine />
          </h1>
          <h1>Instant Sewa</h1>
          <h1>Popular</h1>
          {activeTab === "sewaprovider" ? (
            <h1>New</h1>
          ) : (
            <h1 className="flex items-center">
              Price
              <GoArrowDown className="hidden lg:block md:block" />
              <GoArrowDown className="rotate-180" />
            </h1>
          )}
          {activeTab === "sewaprovider" ? (
            <h1>Top Rated</h1>
          ) : (
            <h1>Discount</h1>
          )}
          {activeTab === "sewaprovider" ? <h1>Experience</h1> : null}

          <span className="hidden md:flex lg:flex gap-2 cursor-pointer">
            <TfiMenuAlt
              onClick={() => setActiveState("list")}
              className={
                activestate === "list" ? "text-blue-700" : "text-gray-500"
              }
            />
            <IoGridOutline
              onClick={() => setActiveState("grid")}
              className={
                activestate === "grid" ? "text-blue-700" : "text-gray-500"
              }
            />
          </span>

          <span
            className="md:hidden cursor-pointer  flex"
            onClick={toggleSidebar}
          >
            Filter
            <Image
              src={heroData.filterList}
              alt="heroData"
              width={12}
              height={12}
            />
          </span>
        </span>
      </div>
      {/* for content */}
      {/* Content Section */}
      {activeTab === "sewa" ? (
        activestate === "grid" ? (
          <SewaSection />
        ) : (
          <SewaList />
        )
      ) : activestate === "grid" ? (
        <SewaProvider />
      ) : (
        <div>
          {/* Render SewaProvider List View */}
          <SewaProviderList />
          {/* Add your list-view component here */}
        </div>
      )}

      {/* Sidebar for Filter Section */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50"
          onClick={toggleSidebar} // Close sidebar on clicking the overlay
        >
          <div
            className="fixed right-0 top-0 w-80 bg-white h-full shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
          >
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-gray-600"
            >
              Close
            </button>

            <FilterSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
