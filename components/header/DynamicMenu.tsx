"use client";

import { Bell, Heart, MessageSquareMore } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "../ui/button";
import ProfileAvatar from "./ProfileAvatar";

const DynamicMenu = () => {
  const session = useSession();

  const user = session?.data?.user;

  const isLoggedin = !!session?.data?.user;
  const hasSewaProviderRole = user?.roles.includes("SEWA_PROVIDER");
  return (
    <>
      <div className="flex flex-1 justify-end gap-5 me-5">
        <p className="hidden md:block">Why Sewaverse</p>
        {!hasSewaProviderRole && (
          <Link
            href={{
              pathname: "/account-type",
              query: { role: "serviceProvider" },
            }}
            className="hover:underline decoration-brand hidden md:block"
          >
            <p className="gradient-text">Become a Sewa provider</p>
          </Link>
        )}
      </div>
      <div>
        {isLoggedin ? (
          <div className="flex gap-3 items-center">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="rounded-full border h-10 w-10 bg-gray-200"
            >
              {" "}
              <Heart size={20} />
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="border rounded-full h-10 w-10 bg-gray-200"
            >
              {" "}
              <MessageSquareMore />
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="rounded-full border h-10 w-10 relative bg-gray-200"
            >
              <span className="absolute -top-1 -right-2 w-5 h-5 border rounded-full flex items-center justify-center bg-red-500 text-white">
                2
              </span>
              <Bell />
            </Button>

            <ProfileAvatar />
          </div>
        ) : (
          <>
            <Link href="/login">
              <Button variant={"ghost"} className="px-2">
                Login
              </Button>
            </Link>
            <Link href={{ pathname: "/account-type", query: { role: "user" } }}>
              <Button variant={"brand"}>Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default DynamicMenu;
