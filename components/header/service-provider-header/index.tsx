"use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

import ProfileAvatar from "../ProfileAvatar";

const ServiceProviderHeader = () => {
  const pathname = usePathname();
  const profile = pathname.split("/")[1] || "Dashboard";
  return (
    <header className="py-3 px-5 md:px-16 border-b shadow">
      <div className="flex items-center justify-between">
        <div className="flex gap-5 me-3">
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              width={45}
              height={40}
              alt="sewaverse logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1 gap-8 mx-5">
          <p className="flex gap-1 items-center cursor-pointer ">
            Why Sewaverse
            <RiArrowDropDownLine />
          </p>
          {profile === "profile" && <p className="text-blue-900">User Mode</p>}
          <p className="capitalize">
            {profile === "profile" ? "Dashboard" : "profile"}
          </p>
          <p>Availability Calendar </p>
          <p>Instant Sewa</p>
          <p>Offers</p>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 p-2 shadow-md">
              <FaRegCalendarCheck size={20} />
            </div>
            <div className="rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 p-2 shadow-md">
              <MdOutlineMessage size={20} />
            </div>{" "}
            <div className="rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 p-2 shadow-md">
              <IoIosNotifications size={20} />
            </div>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <ProfileAvatar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ServiceProviderHeader;
