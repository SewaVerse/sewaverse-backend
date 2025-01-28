"use client";
import { useState } from "react";

import BookingSection from "../bookings/page"; // Import the specific sections
import RewardsHistory from "../myprofile/RewardsHistory";
import SewaPoint from "../myprofile/SewaPoint";
import MyWishList from "../wishlist/page";

interface RightSideProps {
  activeSubsection: string;
  activeSection: string;
}

const RightSide = ({ activeSection }: RightSideProps) => {
  // state for Reward History
  const [rewardHistory, setRewardHistory] = useState<boolean>(false);
  // state for Reward redeem..
  const [redeemRewards, setRedeemRewards] = useState<boolean>(false);
  return (
    <div>
      {activeSection === "myBookings" && <BookingSection />}
      {activeSection === "wishlist" && <MyWishList />}

      {activeSection === "myAccount" && (
        <div>
          <SewaPoint
            // activeSubsection={activeSubsection}
            rewardHistory={rewardHistory}
            setRewardHistory={setRewardHistory}
            redeemRewards={redeemRewards}
            setRedeemRewards={setRedeemRewards}
          />
          {rewardHistory && (
            <div>
              <RewardsHistory />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RightSide;
