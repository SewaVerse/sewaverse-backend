"use client";
import { TrophyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SewaPointProps {
 
  rewardHistory: boolean;
  redeemRewards: boolean;
  setRedeemRewards: (value: boolean) => void;
  setRewardHistory: (value: boolean) => void;
}

const SewaPoint = ({
  setRedeemRewards,
  setRewardHistory,
  redeemRewards,
  rewardHistory,
}: SewaPointProps) => {
  return (
    <div className="w-full h-auto border mb-4 shadow-md">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-semibold border p-1 bg-blue-200 rounded-lg flex items-center gap-1 mt-2">
          {" "}
          <TrophyIcon className="text-3xl" />
          1000
        </span>
        <p className="text-xl font-medium p-3">You are Sewaverse Basic User.</p>
      </div>
      <div className="flex justify-between mx-3 mt-4 mb-4 ">
        <Button
          variant="brand"
          className={rewardHistory ? "bg-gray-500 text-white" : ""}
          onClick={() => {
            setRewardHistory(true);
            setRedeemRewards(false);
          }}
        >
          Reward History
        </Button>
        <Button
          variant="brand"
          className={redeemRewards ? "bg-gray-500 text-white" : ""}
          onClick={() => {
            setRewardHistory(false);
            setRedeemRewards(true);
          }}
        >
          Redeem Rewards
        </Button>
      </div>
    </div>
  );
};

export default SewaPoint;
