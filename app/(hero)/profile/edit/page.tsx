"use client";

import { useState } from "react";

import { ProfileData } from "@/lib/types";

import { ProfileCard } from "./_components/profile-card";
import { ProfileForm } from "./_components/profile-form";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Bishal Shrestha",
    joinedDate: "5th Jan, 2024",
    servicesDelivered: 100,
    profession: "Barber",
    experience: "5 Years",
    rating: 4.0,
    offeredServices: ["Hair Cutting"],
    location: ["Kathmandu", "Bhaktapur", "Lalitpur"],
    coreSkills: ["Hair Dressing", "Hair Colouring", "Hair Cutting"],
    profileImage: null,
  });

  const handleUpdateProfile = (updates: Partial<ProfileData>) => {
    setProfileData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <ProfileCard data={profileData} />
      <ProfileForm data={profileData} onUpdate={handleUpdateProfile} />
      {/* <Profession />
      <SkillsEdit />
      <LocationEdit />
      <OfferedServicesEdit /> */}
    </div>
  );
}
