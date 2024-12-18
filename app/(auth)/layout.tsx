import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center my-10 px-4 sm:px-6">
      <Card className="p-0 w-full max-w-6xl">
        <CardContent className="p-0">
          <div className="flex">
            {/* Left Side: Image */}
            <div className="relative w-1/2">
              <Image
                src="/images/authLayout.webp"
                alt="login image"
                width={450}
                height={460}
                className="brightness-50 w-full h-full object-cover"
              />
              <div className="absolute top-0 text-white flex flex-col gap-2 justify-between w-full h-full p-4">
                <h1 className="text-lg font-medium">Sewaverse</h1>
                <div>
                  <h2 className="text-3xl leading-10">
                    <span className="block">Get</span>
                    <span className="block">Every Services</span>
                    <span className="block">You Want!</span>
                  </h2>
                  <p className="text-sm font-poppins font-normal">
                    Book reliable pros for anything from plumbing to personal
                    care, all in one easy platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Form / Dynamic Content */}
            <div className="px-6 mx-6 flex flex-col justify-center w-1/2">
              {children}

              <p className="text-xs text-gray-500 text-center mt-4">
                ©2024 Sewaverse. All rights reserved. Terms of Service
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
