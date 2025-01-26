"use client";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

import { Input } from "@/components/ui/input";

import BookingSummaryForm from "./_components/BookingSummaryForm";
import MyFavouriteSewa from "./_components/MyFavouriteSewa";
import WishList from "./_components/Wishlist";

const serviceIcon = "/images/servicesImage/Childcare.svg";

// wishlist data...
const wishlistData = [
  {
    id: 1,
    provider: "Bishal Shrestha",
    services: [
      {
        serviceName: "Beautician | Bridal | Event",
        description: "Book professional for the event",
        location: "Kathmandu",
        rating: 4.0,
        price: 10000,
        imageUrl: serviceIcon,
      },
      {
        serviceName: "Makeup Artist | Party | Wedding ",
        description: "Professional makeup for parties and weddings",
        location: "Kathmandu",
        rating: 4.5,
        price: 12000,
        imageUrl: serviceIcon,
      },
    ],
  },
  {
    id: 2,
    provider: "Rohan Gurung",
    services: [
      {
        serviceName: "Beautician | Bridal | Event",
        description: "Book professional for the event",
        location: "Kathmandu",
        rating: 4.0,
        price: 10000,
        imageUrl: serviceIcon,
      },
      {
        serviceName: "Makeup Artist | Photoshoot",
        description: "Expert makeup for photoshoots",
        location: "Kathmandu",
        rating: 4.3,
        price: 11000,
        imageUrl: serviceIcon,
      },
    ],
  },
];

const MyWishList = () => {
  const [activeTab, setActiveTab] = useState<"wishlist" | "favourites">(
    "wishlist"
  );

  return (
    <div className=" md:mb-4">
      <div>
        <div className="md:flex items-start gap-6">
          <div
            className={` ${activeTab === "wishlist" ? "md:w-[90%]" : "w-full"}`}
          >
            <h1 className="md:text-3xl text-base font-semibold text-center">
              My Wishlist & Favourite Sewa Providers
            </h1>
            <div className="flex items-center justify-between px-2 mt-2">
              <p
                className={`md:text-lg ${
                  activeTab === "wishlist"
                    ? "gradient-text font-bold ]"
                    : "text-gray-500"
                } cursor-pointer`}
                onClick={() => setActiveTab("wishlist")}
              >
                My Wishlist
              </p>
              <p
                className={`md:text-lg ${
                  activeTab === "favourites"
                    ? "gradient-text font-bold"
                    : "text-gray-500"
                } cursor-pointer`}
                onClick={() => setActiveTab("favourites")}
              >
                My Favourite Sewa Providers
              </p>
            </div>
            <div className="flex px-2 gap-2 items-center">
              <div
                className={`w-[50%] border ${
                  activeTab === "wishlist" ? "border-blue-400" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-[50%] border ${
                  activeTab === "favourites" ? "border-blue-400" : "bg-gray-200"
                }`}
              ></div>
            </div>

            {/* First Section */}
            <div
              className={`${
                activeTab === "wishlist"
                  ? "w-[100%] bg-[#F3F3F3] h-[40px] mt-3  rounded-md mb-2"
                  : "bg-[#F3F3F3] h-[40px] mt-3  rounded-md mb-2"
              }`}
            >
              <div className="flex items-center justify-between mx-4">
                <form action="#" className="flex items-center gap-4">
                  <Input type="checkbox" className="w-[20px]" />
                  <p className="text-base font-medium">
                    Select all ({wishlistData.length} items)
                  </p>
                </form>
                <div className="flex items-center gap-1">
                  <MdDeleteForever size={20} />
                  <p className="text-base font-medium">Delete</p>
                </div>
              </div>
            </div>
          </div>

          {activeTab == "wishlist" && (
            <div className="flex-1">
              <BookingSummaryForm />
            </div>
          )}
        </div>

        {activeTab == "wishlist" && (
          <div className="md:-mt-[360px]">
            <WishList wishListData={wishlistData} />
          </div>
        )}

        {activeTab === "favourites" && <MyFavouriteSewa />}
      </div>
    </div>
  );
};

export default MyWishList;
