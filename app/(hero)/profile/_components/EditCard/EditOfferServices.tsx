"use client";

import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function EditOfferServices() {
  const [offerServices, setOfferServices] = useState<string[]>([
    "Home maintenance",
    "Computer Repairs and maintenance",
  ]);

  const handleDelete = (index: number) => {
    setOfferServices(offerServices.filter((_, i) => i !== index));
  };

  return (
    <div className="my-10">
      <div className="sm:max-w-[500px] md:py-2 border px-2">
        <h1 className="text-xl font-normal text-center">Offer Services</h1>

        <div className="py-4 space-y-4">
          {/* Existing Professions */}
          {offerServices.map((offerServices, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-2 border rounded-md"
            >
              <div className="text-sm">
                <p className="text-base font-medium gradient-text">
                  {offerServices}
                </p>
                <p>Electrician, Plumber</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs cursor-pointer">
                  <Edit size={"12"} />
                  <p>Edit</p>
                </div>
                <div
                  onClick={() => handleDelete(index)}
                  className="flex items-center gap-1 text-xs cursor-pointer"
                >
                  <Trash2 size={"12"} />
                  <p>Delete</p>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Profession */}
          <div className="p-2 space-y-2 border rounded-md">
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <PlusCircle color="green" size={"18"} />
              <h3 className="text-lg font-medium ">Add Service</h3>
            </div>
          </div>

          {/* Done Button */}
          <div className="flex justify-center">
            <Button variant={"brand"} className="">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
