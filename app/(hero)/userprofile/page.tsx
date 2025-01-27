"use client";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MyProfile from "./myprofile/MyProfile";
import PaymentOption from "./myprofile/PaymentOption";
import RedeemRewards from "./myprofile/RedeemRewards";
import RewardsHistory from "./myprofile/RewardsHistory";
import SewaPoint from "./myprofile/SewaPoint";

// profile data.

const userData = {
  name: "Rohan Shrestha",
  phone: 981111111111,
  email: "bishalshrestha@gmail.com",
  address: "Balaju, Tarakeshwor-3, Kathmandu, Bagmati Province",
  image:"/images/servicesImage/profile1.svg",
  status: 'Verified | unverified'
};



export default function TabsDemo() {
  const [rewardHistory, setRewardHistory] = useState<boolean>(false);
  // state for Reward redeem..
  const [redeemRewards, setRedeemRewards] = useState<boolean>(false);
  return (
    <Tabs defaultValue="profile" className="w-full ">
      <TabsList className="grid md:w-[50%] grid-cols-3 mx-auto">
        <TabsTrigger value="profile">Myprofile</TabsTrigger>
        <TabsTrigger value="sewa">Sewa points</TabsTrigger>
        <TabsTrigger value="options">Payment options </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <MyProfile userData ={userData} />
      </TabsContent>
      <TabsContent value="sewa">
        <SewaPoint
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
        {redeemRewards && (
          <div>
            <RedeemRewards />
          </div>
        )}
      </TabsContent>
      <TabsContent value="options">
        <PaymentOption />
      </TabsContent>
    </Tabs>
  );
}
