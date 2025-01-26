"use client";
import { useState } from "react";

import Offer from "./_components/Offer";
import Promocodes from "./_components/Promocodes";
const offersData = [
  {
    id: 1,
    title: "Refer & Earn",
    description:
      "The painter service exceeded expectations with its exceptional workmanship and timely completion. The team was friendly, efficient, and ensured a smooth process. Overall,...",
    date: "25-26 Jan",
    image: "/images/servicesImage/Beautician.svg",
  },
  {
    id: 2,
    title: "Festive Discount",
    description:
      "The painter service exceeded expectations with its exceptional workmanship and timely completion. The team was friendly, efficient, and ensured a smooth process. Overall,...",
    image: "/images/servicesImage/Beautician.svg",
    date: "25-26 Jan",
  },
  {
    id: 3,
    title: "Seasonal Sale",
    description:
      "The painter service exceeded expectations with its exceptional workmanship and timely completion. The team was friendly, efficient, and ensured a smooth process. Overall,...",
    date: "10-20 Feb",
    image: "/images/servicesImage/Beautician.svg",
  },
  {
    id: 4,
    title: "First-Time User Offer",
    description:
      "The painter service exceeded expectations with its exceptional workmanship and timely completion. The team was friendly, efficient, and ensured a smooth process. Overall,...",
    date: "15-18 Feb",
    image: "/images/servicesImage/Beautician.svg",
  },
  {
    id: 5,
    title: "Loyalty Rewards",
    description:
      "The painter service exceeded expectations with its exceptional workmanship and timely completion. The team was friendly, efficient, and ensured a smooth process. Overall,...",
    date: "20-25 Feb",
    image: "/images/servicesImage/Beautician.svg",
  },
  {
    id: 6,
    title: "Loyalty Rewards",
    description:
      "The painter service exceeded expectations with its exceptional workmanship and timely completion. The team was friendly, efficient, and ensured a smooth process. Overall,...",
    date: "20-25 Feb",
    image: "/images/servicesImage/Beautician.svg",
  },
];

// promo codes data

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>("offers");

  return (
    <div className="">
      <h1 className="text-2xl font-medium">Offers & Promocodes</h1>

      {/* Tab Selection */}
      <div className="flex justify-around text-xl mt-4">
        <p
          onClick={() => setActiveTab("offers")}
          className={`cursor-pointer ${
            activeTab === "offers" ? "gradient-text" : ""
          }`}
        >
          Offers
        </p>
        <p
          onClick={() => setActiveTab("promocodes")}
          className={`cursor-pointer ${
            activeTab === "promocodes" ? "gradient-text" : ""
          }`}
        >
          Promocodes
        </p>
      </div>

      {/* Underline */}
      <div className="flex justify-between gap-4 mt-2">
        <div
          className={`w-[50%] border  ${
            activeTab === "offers" ? "border-blue-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`w-[50%] border ${
            activeTab === "promocodes" ? "border-blue-500" : "bg-gray-300"
          }`}
        ></div>
      </div>
      {/* for offer section */}

      {activeTab === "offers" && <Offer offers={offersData} />}

      {activeTab === "promocodes" && <Promocodes />}
    </div>
  );
};

export default Page;
