"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent } from "./ui/card";


const ImageContainer = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
    useEffect(() => {
     
      const role = searchParams.get("role");
      setUserAccountType(role!);
      
      
    }, [searchParams,]);
  const [userAccountType, setUserAccountType] = useState<string>("");

  return (
    <div className="flex justify-center p-4 md:p-6">
      <Card className="p-0 w-full max-w-6xl">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Left Side: Image */}
            <div className="hidden relative md:block md:w-1/2">
              <Image
                src={
                  userAccountType === "user"
                    ? "/images/user.jpg"
                    : "/images/sewaprovider.jpg"
                }
                alt="login image"
                width={400}
                height={400}
                className="w-full h-full max-h-[36rem] aspect-auto object-cover rounded-l-xl"
              />
            </div>

            {/* Right Side: Form / Dynamic Content */}
            <div className="px-4 md:px-6 flex flex-col justify-between md:w-1/2">
              {children}
              <p className="hidden md:block mb-5 text-xs text-gray-500 text-center">
                ©2024 Sewaverse. All rights reserved. Terms of Service
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageContainer;
