"use client";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AllBooking from "./AllBooking";
import CanceledTab from "./CanceledTab";
import CompletedTab from "./CompletedTab";
import OnGoing from "./OnGoing";
import TopayTab from "./ToPay";
import ToReview from "./ToReview";

const sewaOptions = [
  { value: "all", label: "All Sewa" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrician", label: "Electrician" },
  { value: "pet-care", label: "Pet Care" },
];

const filterOptions = [
  { value: "all", label: "All Bookings" },
  { value: "last-5", label: "Last 5 Bookings" },
  { value: "last-15-days", label: "Last 15 Days" },
  { value: "last-30-days", label: "Last 30 Days" },
  { value: "last-6-months", label: "Last 6 Months" },
];

const BookingSection = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  // list of the tab
  const tabs: string[] = [
    "All",
    "Ongoing",
    "To Pay",
    "Completed",
    "Canceled",
    "To Review",
  ];
  const FilterIcon = "/images/servicesImage/FilterList.svg";

  return (
    <div className="w-full h-auto border  mb-4 shadow-md">
      <div className="px-3">
        <h1 className=" text-2xl font-medium">My Bookings</h1>
        <p className="text-sm text-muted-foreground">
          See your scheduled service bookings{" "}
        </p>
      </div>
      {/* for navbar */}
      <div className="flex justify-between md:px-5 px-3 text text-sm cursor-pointer mt-3 font-medium">
        {tabs.map((tab) => (
          <p
            key={tab}
            className={`${activeTab === tab ? "gradient-text" : "text-black"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-between md:px-5 px-3 mt-4">
        <div className="flex items-center gap-1 md:gap-2">
          <EyeIcon size={20} />
          <p className="md:text-sm text-[10px]">Show</p>
          <Select>
            <SelectTrigger className="md:w-[150px] w-[100px] h-5 md:h-10 bg-white border-[1px] rounded-md md:text-lg text-[10px]">
              <SelectValue placeholder="Select Sewa" />
            </SelectTrigger>
            <SelectContent className="w-full bg-white rounded-lg shadow-lg">
              <SelectGroup>
                {sewaOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center md:gap-2 gap-1">
          <Image
            src={FilterIcon}
            alt="filter"
            height={1}
            width={1}
            className="md:w-[23px] md:h-[22px] w-[15px] h-[15px] "
          />
          <p className="md:text-sm text-[10px]">Filter</p>
          <Select>
            <SelectTrigger className="md:w-[200px] w-[100px] h-5 md:h-10 bg-white border-[1px] rounded-md md:text-lg text-[10px]">
              <SelectValue placeholder="Select Date Filter" />
            </SelectTrigger>
            <SelectContent className="md:w-full bg-white rounded-lg shadow-lg">
              <SelectGroup>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* for all booking section */}

      {activeTab === "All" && <AllBooking />}
      {activeTab === "Ongoing" && <OnGoing />}
      {activeTab === "To Pay" && <TopayTab />}
      {activeTab === "Completed" && <CompletedTab />}
      {activeTab === "Canceled" && <CanceledTab />}
      {activeTab === "To Review" && <ToReview />}
    </div>
  );
};

export default BookingSection;
