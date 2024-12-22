"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { SignOut } from "./SignOut";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Header = () => {
  const session = useSession();

  const isLoggedin = !!session?.data?.user;
  const hasSewaProviderRole =
    session?.data?.user?.roles.includes("SEWA_PROVIDER");
  return (
    <header className="py-3 px-5 md:px-10 border-b shadow">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 gap-5 me-3">
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              width={45}
              height={40}
              alt="sewaverse logo"
            />
          </Link>

          <div className="md:flex md:flex-1 me-10 hidden relative">
            <Input
              placeholder="Search services..."
              type="search"
              className="text-sm h-full pe-[8rem] w-full"
            />
            <div className="absolute top-0 right-0  flex h-full ">
              <div className="flex items-center px-2  my-1 border-l-2">
                <Image
                  src="/images/location.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
                <p className="text-xs text-brand mx-2">Jorpati</p>
              </div>
              <div className="bg-brand-gradient p-2 h-full rounded-e-md flex items-center">
                <Image
                  src="/images/search.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
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
          {isLoggedin ? (
            <SignOut />
          ) : (
            <>
              <Link href="/login">
                <Button variant={"ghost"} className="px-2">
                  Login
                </Button>
              </Link>
              <Link
                href={{ pathname: "/account-type", query: { role: "user" } }}
              >
                <Button variant={"brand"}>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
