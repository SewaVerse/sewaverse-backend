"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LayoutDashboard, User } from "lucide-react";
import { useSession } from "next-auth/react"; // To access user session

import { SignOut } from "./SignOut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ProfileAvatar = () => {
  const { data: session } = useSession();

  const fallbackName = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((part) => part[0].toUpperCase())
        .join("")
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus-visible:outline-none">
        <Avatar>
          <AvatarImage
            className="rounded-full h-10 w-10 shadow-sm"
            src={session?.user?.image || ""}
            alt="user image"
          />
          <AvatarFallback className="capitalize p-2 border rounded-full  h-10 w-10 font-semibold text-xl">
            {fallbackName}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
