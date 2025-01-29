import { useState } from "react";

import All from "./AllPromos";
import Collect from "./Collect";
import Expired from "./Expired";
import RecentUse from "./RecentUse";
import SewaProvider from "./SewaProvider";
import SewaVerse from "./SewaVerse";

export const sewaData = [
  {
    code: "EX1234SS5",
    discount: "GET 10% DISCOUNT",
    service: "all Sewa",
    providedBy: "Sewaverse",
    dateRange: "Starts on 25-26 Jan | Expires on 25-26 Jan",
    status: "Collected",
  },
  {
    code: "EX1234SS5",
    discount: "GET 10% DISCOUNT",
    service: "all Sewa",
    providedBy: "Sewaverse",
    dateRange: "Starts on 25-26 Jan | Expires on 25-26 Jan",
    status: "Collected",
  },
  {
    code: "EX5678SS9",
    discount: "GET 15% DISCOUNT",
    service: "Laptop Repairs",
    providedBy: "Sewaverse",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "Collect",
  },
  {
    code: "EX9101SS2",
    discount: "GET 20% DISCOUNT",
    service: "Laptop Repairs, Home Mainta...",
    providedBy: "Sewaverse",
    dateRange: "Starts on 10-12 Mar | Expires on 10-12 Mar",
    status: "Expired",
  },
];

export const providerData = [
  {
    code: "EX1234SS5",
    discount: "GET 10% DISCOUNT",
    service: "all Sewa",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 25-26 Jan | Expires on 25-26 Jan",
    status: "Collected",
  },
  {
    code: "EX1234SS5",
    discount: "GET 10% DISCOUNT",
    service: "Sewa 1",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 25-26 Jan | Expires on 25-26 Jan",
    status: "Collected",
  },
  {
    code: "EX5678SS9",
    discount: "GET 15% DISCOUNT",
    service: "Sewa 1,2",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 01-02 Feb | Expires on 01-02 Feb",
    status: "Collect",
  },
  {
    code: "EX9101SS2",
    discount: "GET 20% DISCOUNT",
    service: "Sewa 1,2",
    providedBy: "Bishal Shrstha",
    dateRange: "Starts on 10-12 Mar | Expires on 10-12 Mar",
    status: "Expired",
  },
];

const Promocodes = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("All");
  const [activeBar, setActiveBar] = useState<string>("All");

  return (
    <div className="md:px-3">
      {/* Tab Section */}
      <div className="flex justify-between py-3">
        <p
          className={`cursor-pointer ${
            activeBar === "All" ? "gradient-text" : ""
          }`}
          onClick={() => {
            setActiveBar("All");
            setActiveTab("All"); 
          }}
        >
          All <span className="text-muted-foreground">(10)</span>
        </p>
        <p
          className={`cursor-pointer ${
            activeBar === "sewaverse" ? "gradient-text" : ""
          }`}
          onClick={() => {
            setActiveBar("sewaverse");
            setActiveTab("All"); // Reset activeTab when Sewaverse is clicked
          }}
        >
          Sewaverse<span className="text-muted-foreground">(5)</span>
        </p>
        <p
          className={`cursor-pointer ${
            activeBar === "sewaprovider" ? "gradient-text" : ""
          }`}
          onClick={() => {
            setActiveBar("sewaprovider");
            setActiveTab("All"); 
          }}
        >
          SewaProvider<span className="text-muted-foreground">(5)</span>
        </p>
      </div>

      {/* Header Section */}
      <div className="md:w-[500px] md:h-auto">
        <p className="md:text-2xl font-medium">Promocodes</p>
        <div className="flex md:gap-10 gap-4 py-2">
          <p
            className={`cursor-pointer bg-gray-300 p-1 rounded-md ${
              activeTab === "Collect" ? "gradient-text" : ""
            }`}
            onClick={() => setActiveTab("Collect")}
          >
            Recently Collected
          </p>
          <p
            className={`cursor-pointer bg-gray-300 p-1 rounded-md ${
              activeTab === "Expired" ? "gradient-text" : ""
            }`}
            onClick={() => setActiveTab("Expired")}
          >
            Expiring
          </p>
          <p
            className={`cursor-pointer bg-gray-300 p-1 rounded-md ${
              activeTab === "Recently" ? "gradient-text" : ""
            }`}
            onClick={() => setActiveTab("Recently")}
          >
            Recently Used
          </p>
        </div>
      </div>

      {/* Promocodes Grid */}
      {activeTab === "All" && (
        <>
          {activeBar === "All" && <All />}
          {activeBar === "sewaverse" && <SewaVerse sewaData={sewaData} />}
          {activeBar === "sewaprovider" && <SewaProvider providerData={providerData} />}
        </>
      )}

      {/* Render activeTab components independently */}
      {activeTab === "Collect" && <Collect />}
      {activeTab === "Recently" && <RecentUse />}
      {activeTab === "Expired" && <Expired />}
    </div>
  );
};

export default Promocodes;