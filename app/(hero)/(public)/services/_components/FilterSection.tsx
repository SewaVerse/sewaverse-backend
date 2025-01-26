"use client";

import { Star } from "lucide-react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  id: string;
  label: string;
}

const sewaOptions: FilterOption[] = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "room", label: "Room" },
  { id: "office", label: "Office Space" },
];

const locationOptions: FilterOption[] = [
  { id: "kathmandu", label: "Kathmandu" },
  { id: "bhaktapur", label: "Bhaktapur" },
  { id: "lalitpur", label: "Lalitpur" },
  { id: "pokhara", label: "Pokhara" },
  { id: "chitwan", label: "Chitwan" },
];

const priceRanges: FilterOption[] = [
  { id: "less_than_5k", label: "Less than Rs. 5k" },
  { id: "5k_to_10k", label: "Rs. 5k to Rs. 10k" },
  { id: "10k_to_20k", label: "Rs. 10k to Rs. 20k" },
  { id: "20k_plus", label: "Rs. 20k +" },
];

const ratingOptions: FilterOption[] = [
  { id: "5", label: "5 Stars" },
  { id: "4", label: "4 Stars" },
  { id: "3", label: "3 Stars" },
  { id: "2", label: "2 Stars" },
  { id: "1", label: "1 Star" },
];

const FilterSection = () => {
  const [selectedSewa, setSelectedSewa] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  const handlePriceRangeChange = (checked: boolean, id: string) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, id]);
    } else {
      setSelectedPriceRanges(
        selectedPriceRanges.filter((range) => range !== id)
      );
    }
  };

  const handleRatingChange = (checked: boolean, id: string) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, id]);
    } else {
      setSelectedRatings(selectedRatings.filter((rating) => rating !== id));
    }
  };

  return (
    <div className="hidden md:block w-full max-w-sm border rounded-md py-4">
      <form className="space-y-6 px-4 md:px-8">
        <div className="space-y-2 ">
          <label className="text-sm font-medium">Sewa</label>
          <Select value={selectedSewa} onValueChange={setSelectedSewa}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Sewa" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sewaOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {locationOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price</label>
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center space-x-2">
              <Checkbox
                id={range.id}
                checked={selectedPriceRanges.includes(range.id)}
                onCheckedChange={(checked) =>
                  handlePriceRangeChange(checked as boolean, range.id)
                }
              />
              <label htmlFor={range.id} className="text-sm">
                {range.label}
              </label>
            </div>
          ))}
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2"
            />
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>
          {ratingOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${option.id}`}
                checked={selectedRatings.includes(option.id)}
                onCheckedChange={(checked) =>
                  handleRatingChange(checked as boolean, option.id)
                }
              />
              <label
                htmlFor={`rating-${option.id}`}
                className="flex items-center"
              >
                {[...Array(Number.parseInt(option.id))].map((_, index) => (
                  <Star
                    key={index}
                    className="w-4 h-4 fill-current text-yellow-400"
                  />
                ))}
                {[...Array(5 - Number.parseInt(option.id))].map((_, index) => (
                  <Star key={index} className="w-4 h-4 text-gray-300" />
                ))}
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default FilterSection;
