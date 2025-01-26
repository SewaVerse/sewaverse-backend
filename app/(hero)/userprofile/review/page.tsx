import { EyeIcon } from "lucide-react";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import BookingCard from "./_components/BookingCard";
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
const FilterIcon = "/images/servicesImage/FilterList.svg";

const page = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-medium md:px-5">My Reviews</h1>
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
      <BookingCard/>
    </div>
  );
};

export default page;
