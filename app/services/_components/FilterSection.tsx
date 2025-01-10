"use client"


import { FaChevronDown, FaStar } from "react-icons/fa6";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const FilterSection = () => {
  return (
    <div >
      <div className=" w-full ml-[25px] hidden sm:block md:block md:w-[400px] h-[937px] md:ml-[62px] mt-[1.3125rem] border-[1px]  rounded-[0.3125rem] shadow-xl">
    <div className="flex items-start">
    <p className="font-work-sans p-3 font-[500] text-[14px] ml-6">
    Sewa
  </p>
    </div>
  {/* for form */}
  <form action="#">
  
  <div className="flex items-start flex-col ">
 
  <div className=" ml-6">
  <Select >
      <SelectTrigger className="w-[350px]  h-[34px] rounded-lg shadow-lg ">
        <SelectValue placeholder="Select a Sewa" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  
    <p className="mt-[16px] ml-6 font-work-sans font-[500] text-[14px]">
      Location
    </p>
    <div className="ml-6 mt-2">
  <Select >
      <SelectTrigger className="w-[350px]  h-[34px] rounded-lg shadow-lg ">
        <SelectValue placeholder="Select a location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel >Location</SelectLabel>
          <SelectItem value="apple">Kathmandu</SelectItem>
          <SelectItem value="banana">Bhaktpur</SelectItem>
          <SelectItem value="blueberry">Lalitpur</SelectItem>
          <SelectItem value="grapes">Pokhara</SelectItem>
          <SelectItem value="pineapple">Chetwan</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  </div>

    

    {/* for price */}
    <div className=" flex flex-col ">
      
    <p className="mt-[32px] ml-6 font-work-sans font-[500] text-[14px]">
      Price
    </p>
    <div className="flex items-start gap-[10px] ml-[37px] mt-[10px]">
      <input type="checkbox" className="w-[18px] h-[18px]" />
      <p className="font-[400] font-work-sans text-[14px]">
        Less than Rs. 5k
      </p>
    </div>
    <div className="flex items-center gap-[10px] ml-[37px] mt-[18px]">
      <input type="checkbox" className="w-[18px] h-[18px]" />
      <p className="font-[400] font-work-sans text-[14px]">
        Rs. 5k to Rs. 10k
      </p>
    </div>
    <div className="flex items-center gap-[10px] ml-[37px] mt-[18px]">
      <input type="checkbox" className="w-[18px] h-[18px]" />
      <p className="font-[400] font-work-sans text-[14px]">
        Rs. 10k to Rs. 20k
      </p>
    </div>
    <div className="flex items-center gap-[10px] ml-[37px] mt-[18px]">
      <input type="checkbox" className="w-[18px] h-[18px]" />
      <p className="font-[400] font-work-sans text-[14px]">Rs. 20k +</p>
    </div>
    <div className="flex items-center gap-[10px] ml-[37px] mt-[18px]">
      <input type="checkbox" className="w-[18px] h-[18px]" />
      <div className="w-[96px] h-[26px] rounded-[10px] border-[2px]">
        <p className="ml-2">
          Rs <span className="text-[#878787] ml-1">Min</span>
        </p>
      </div>
      <div className="w-[96px] h-[26px] rounded-[10px] border-[2px]">
        <p className="ml-2">
          Rs <span className="text-[#878787] ml-1">Max</span>
        </p>
      </div>
    </div>
    {/* for rating */}
    <div className="mt-[25px] ml-6 items-center justify-between flex">
      <p className="font-[500] font-sans text-[14px]">Rating</p>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center cursor-pointer">
          <FaChevronDown className="mr-[20px] " />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[360px] ml-10 mr-96">
          {/* 5 Star Rating */}
          <DropdownMenuItem >
            <div className="flex items-center gap-[8px]">
              <input type="checkbox" className="w-[18px] h-[18px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
            </div>
          </DropdownMenuItem>
          {/* 4 Star Rating */}
          <DropdownMenuItem>
            <div className="flex items-center gap-[8px]">
              <input type="checkbox" className="w-[18px] h-[18px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
            </div>
          </DropdownMenuItem>
          {/* 3 Star Rating */}
          <DropdownMenuItem>
            <div className="flex items-center gap-[8px]">
              <input type="checkbox" className="w-[18px] h-[18px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
            </div>
          </DropdownMenuItem>
          {/* 2 Star Rating */}
          <DropdownMenuItem>
            <div className="flex items-center gap-[8px]">
              <input type="checkbox" className="w-[18px] h-[18px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
            </div>
          </DropdownMenuItem>
          {/* 1 Star Rating */}
          <DropdownMenuItem>
            <div className="flex items-center gap-[8px]">
              <input type="checkbox" className="w-[18px] h-[18px]" />
              <FaStar className="text-orange-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
              <FaStar className="text-gray-500 w-[29px]" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
       

    </div>
  </form>
</div>

    </div>
  );
};

export default FilterSection;
