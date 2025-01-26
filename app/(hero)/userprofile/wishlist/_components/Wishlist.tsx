"use client";
import Image from "next/image";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaShareAlt, FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define types for the service and wishlist data
interface Service {
  serviceName: string;
  description: string;
  location: string;
  rating: number;
  price: number;
  imageUrl: string;
}

interface WishlistItem {
  id: number;
  provider: string;
  services: Service[];
}

interface WishListProps {
  wishListData: WishlistItem[];
}

const WishList = ({ wishListData }: WishListProps) => {
  // State to manage the wishlist data
  const [wishlist, setWishlist] = useState<WishlistItem[]>(wishListData);

  // Function to delete a service from a specific WishlistItem
  const deleteService = (itemId: number, serviceIndex: number) => {
    setWishlist(
      (prevWishlist) =>
        prevWishlist
          .map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  services: item.services.filter(
                    (_, index) => index !== serviceIndex
                  ),
                }
              : item
          )
          .filter((item) => item.services.length > 0) // Remove WishlistItems with no services
    );
  };

  // Function to delete an entire WishlistItem
  const deleteWishlistItem = (itemId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== itemId)
    );
  };

  return (
    <div className="md:w-[70%]">
      {/* Dynamic Content */}
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="h-auto bg-[#F3F3F3] mx-[1px] rounded-md mb-4"
        >
          <form action="#" className="flex items-center gap-4 px-4">
            <Input className="w-[20px]" type="checkbox" />
            <h1 className="text-base font-medium">Sewa by {item.provider}</h1>
          </form>

          {item.services.map((service, index) => (
            <div
              key={index}
              className="md:flex items-center gap-4 mt-2 md:px-4"
            >
              <form action="#">
                <Input className="w-[20px] hidden md:block " type="checkbox" />
              </form>
              <div className="md:h-auto md:w-[980px] h-auto border rounded-lg mb-2">
                <div className="md:flex items-center gap-5">
                  <div className="md:w-[120px] h-auto m-3">
                    <Image
                      src={service.imageUrl}
                      alt={service.serviceName}
                      width={120}
                      height={0}
                      className="h-auto w-full object-cover"
                    />
                  </div>

                  <div className="flex items-center md:justify-between md:w-full h-auto">
                    <div className="basis-3/4">
                      <h1 className="text-2xl font-semibold">
                        {service.serviceName}
                      </h1>
                      <p className="text-lg font-medium">
                        {service.description}
                      </p>
                      <div className="flex items-center text-lg gap-1">
                        {Array.from({
                          length: Math.floor(service.rating),
                        }).map((_, i) => (
                          <FaStar key={i} color="orange" />
                        ))}
                        <p>{service.rating.toFixed(1)}</p>
                      </div>
                      <span className="flex items-center gap-1 text-lg">
                        <CiLocationOn />
                        <p className="text-muted-foreground">
                          {service.location}
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-col gap-4"></div>
                    <div className="flex-col items-center justify-end gap-1 px-2">
                      <p className="text-2xl font-semibold md:flex justify-center mt-7">
                        Rs. {service.price}
                      </p>
                      <div className="flex gap-2 mt-28 md:mt-12 mb-3">
                        <Button
                          variant={"brand"}
                          onClick={() => deleteService(item.id, index)}
                        >
                          <MdDeleteForever size={"sm"} color="white" />
                          Delete
                        </Button>
                        <Button variant={"brand"}>
                          <FaShareAlt size={"sm"} color="white" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WishList;
