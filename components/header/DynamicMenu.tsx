"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import ProfileAvatar from "./ProfileAvatar";
import { Button } from "../ui/button";

const DynamicMenu = () => {
  const session = useSession();

  const user = session?.data?.user;

  const isLoggedin = !!session?.data?.user;
  const hasSewaProviderRole = user?.roles.includes("SEWA_PROVIDER");
  return (
    <>
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
      {isLoggedin ? (
        <ProfileAvatar />
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
    </>
  );
};

export default DynamicMenu;
