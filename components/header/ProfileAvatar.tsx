"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react"; // To access user session
import Link from "next/link";
import { RiAdminLine } from "react-icons/ri";

import { getFallbackName } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SignOut } from "./SignOut";

const ProfileAvatar = () => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.roles.includes("ADMIN");

  const isServiceProvider =
    session?.user?.roles.includes("SERVICE_PROVIDER") &&
    session?.user?.roles.includes("USER");

  const isUser =
    session?.user?.roles?.length === 1 && session.user.roles[0] === "USER";

  const fallbackName = getFallbackName(session?.user?.name ?? "");

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
        <DropdownMenuItem>
          <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
        </DropdownMenuItem>

        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <Link href="/admin">
              <DropdownMenuItem>
                <RiAdminLine />
                Admin Dashboard
              </DropdownMenuItem>
            </Link>
          </>
        )}
        {isServiceProvider && (
          <>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>
                <RiAdminLine />
                Service Provider Profile
              </DropdownMenuItem>
            </Link>
          </>
        )}

        {isUser && (
          <>
            <DropdownMenuSeparator />
            <Link href="/userprofile">
              <DropdownMenuItem>
                <RiAdminLine />
                User Profile
              </DropdownMenuItem>
            </Link>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <Link href="/profile">
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
