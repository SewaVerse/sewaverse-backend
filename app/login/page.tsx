"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="flex">
            <div className="relative">
              <Image
                src="/images/login.svg"
                alt="login image"
                width={450}
                height={460}
                className="brightness-50"
              />
              <div className="absolute top-0 text-white flex flex-col gap-2  justify-between w-full h-full p-4">
                <h1 className="text-lg font-medium ">Sewaverse</h1>
                <div>
                  <h2 className="text-3xl leading-10">
                    <span className="block">Get</span>
                    <span className="block">Every Services</span>
                    <span className="block">You Want!</span>
                  </h2>
                  <p className="text-sm  font-poppins font-normal">
                    Book reliable pros for anything from plumbing to personal
                    care, all in one easy platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 mx-6 flex flex-col justify-between md:min-w-[30rem]">
              <div>
                <LoginForm />
                <div className="flex justify-center my-2">
                  <p className="text-sm">
                    {"Don't have an account?"}
                    <Link href="/register" className="text-primary">
                      {" "}
                      Register here
                    </Link>
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center mb-2">
                ©2024 Sewaverse. All rights reserved. Terms of Service
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
