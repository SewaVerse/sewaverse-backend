import { useState } from "react";

import Collect from "./Collect";
import Expired from "./Expired";
import PromoList from "./PromoList";
import RecentUse from "./RecentUse";

const Promocodes = () => {
  // state for active tab..
  const [activeTab, setActiveTab] = useState<string>("All");
  const [activeBar, setActiveBar] = useState<string>("All");

  return (
    <div className="md:px-3">
      {/* Tab Section */}
      <div className="flex justify-between py-3">
        <p
          className={`${activeBar === "All" ? "gradient-text" : ""}`}
          onClick={() => setActiveBar("All")}
        >
          All <span className="text-muted-foreground">(10)</span>
        </p>
        <p
          className={`${activeBar === "sewaverse" ? "gradient-text" : ""}`}
          onClick={() => setActiveBar("sewaverse")}
        >
          Sewaverse<span className="text-muted-foreground">(5)</span>
        </p>
        <p
          className={`${activeBar === "sewaprovider" ? "gradient-text" : ""}`}
          onClick={() => setActiveBar("sewaprovider")}
        >
          SewaProvider<span className="text-muted-foreground">(5)</span>
        </p>
      </div>

      {/* Header Section */}
      <div className="md:w-[500px] md:h-auto ">
        <p className="text-2xl font-medium">Promocodes</p>
        <div className="flex md:gap-10 gap-4 py-2 cursor-pointer">
          <p
            className={`bg-gray-300 p-1 rounded-md ${
              activeTab === "Collect" ? "gradient-text " : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("Collect")}
          >
            Recently Collected
          </p>
          <p
            className={`bg-gray-300 p-1 rounded-md ${
              activeTab === "Expired" ? "gradient-text " : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("Expired")}
          >
            Expiring
          </p>
          <p
            className={`bg-gray-300 p-1 rounded-md ${
              activeTab === "Recently" ? "gradient-text " : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("Recently")}
          >
            Recently Used
          </p>
        </div>
      </div>

      {/* Promocodes Grid */}
      {activeTab === "All" && <PromoList />}

      {activeTab == "Collect" && <Collect />}
      {activeTab === "Recently" && <RecentUse />}
      {activeTab === "Expired" && <Expired />}
    </div>
  );
};

export default Promocodes;
