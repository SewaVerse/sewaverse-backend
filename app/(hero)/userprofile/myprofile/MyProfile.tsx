/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { CameraIcon, PhoneCallIcon, VerifiedIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";

import { Button } from "@/components/ui/button";

import ChangePassword from "./ChnagePassword";
import EditUserPRofile from "./EditUserProfile";

interface userData {
  name: string;
  email: string;
  image: string;
  address: string;
  status: string;
  phone: number;
}

// for active profile
interface MyProfileProps {
  userData: userData;
}
const MyProfile = ({ userData }: MyProfileProps) => {
  // state for open change password popup.
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  //   state for open edit profile popup....
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  return (
    <div>
      <div className="w-full h-auto border mb-4 shadow-md">
        <div className="flex flex-col items-center">
          {/* for image */}
          <div className="w-[250px] h-[250px] rounded-full mt-3 relative  border overflow-hidden">
            <Image
              src={previewImage || userData.image}
              alt="profile"
              width={250}
              height={250}
              className="object-cover w-[250px] h-[250px]"
            />
          </div>
          <div
            className="absolute top-[22rem] right-[30rem] cursor-pointer p-1 border bg-white rounded-full"
            onClick={handleCameraClick}
          >
            <CameraIcon size={25} />
          </div>
          <span className="border p-1 rounded-md text-sm bg-blue-300 text-white flex items-center mt-2">
            <VerifiedIcon size={14} />
            {userData.status.includes("Verified") ? "Verified" : "Unverified"}
          </span>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {/* users details */}

          <h1 className="text-2xl font-semibold mt-2">{userData.name}</h1>
          <p className="flex items-center gap-1 text-lg p-1">
            <PhoneCallIcon size={14} color="blue" />
            {userData.phone}
          </p>
          <p className="flex items-center gap-1 text-lg p-1">
            <TfiEmail size={14} color="blue" />
            {userData.email}
          </p>
          <p className="flex items-center gap-1 text-lg p-1">
            <CiLocationOn color="blue" />
            {userData.address}
          </p>
        </div>
        <div className="flex justify-between mt-2 mx-3 mb-4">
          <Button
            variant={"brand"}
            type="button"
            onClick={() => setOpenChangePassword(true)}
          >
            Change Password
          </Button>
          <Button
            variant={"brand"}
            type="button"
            onClick={() => setOpenEditProfile(true)}
          >
            Edit Profile
          </Button>
        </div>
      </div>
      {openChangePassword && (
        <ChangePassword
          openChangePassword={openChangePassword}
          setOpenChangePassword={setOpenChangePassword}
        />
      )}
      {/* for edit profile */}
      {openEditProfile && (
        <EditUserPRofile
          openEditProfile={openEditProfile}
          setOpenEditProfile={setOpenEditProfile}
        />
      )}
    </div>
  );
};

export default MyProfile;
