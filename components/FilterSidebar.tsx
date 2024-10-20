// components/FilterSidebar.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import { useState } from "react";

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  return (
    <aside className="w-1/4 p-4 bg-white border-r border-gray-200">
      {/* Sewa Type */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Sewa Type
        </label>
        <Select>
          <SelectTrigger className="w-full">Select Sewas</SelectTrigger>
          <SelectContent>
            <SelectItem value="cleaning">Cleaning</SelectItem>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="painting">Painting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sewa Location */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Sewa Location
        </label>
        <Select>
          <SelectTrigger className="w-full">Select Location</SelectTrigger>
          <SelectContent>
            <SelectItem value="kathmandu">Kathmandu</SelectItem>
            <SelectItem value="lalitpur">Lalitpur</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sewa Price */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Sewa Price
        </label>
        <div className="flex flex-col space-y-2">
          <Checkbox label="Less than Rs. 10k" />
          <Checkbox label="Rs. 10k to Rs. 20k" />
          <Checkbox label="Rs. 20k to Rs. 30k" />
          <Checkbox label="Rs. 30k+" />
          <div className="flex space-x-2">
            <Input
              placeholder="Rs Min"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
              className="w-full"
            />
            <Input
              placeholder="Rs Max"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Ratings
        </label>
        <div className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <div key={rating} className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
