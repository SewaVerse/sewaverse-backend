import Image from "next/image";

import { Card, CardContent } from "./ui/card";

const ImageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center p-4 md:p-6">
      <Card className="p-0 w-full max-w-6xl">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Left Side: Image */}
            <div className="hidden relative md:block md:w-1/2">
              <Image
                src="/images/authLayout.webp"
                alt="login image"
                width={400}
                height={400}
                className="brightness-50 w-full h-full max-h-[36rem] aspect-auto object-cover rounded-l-xl"
              />
              <div className="absolute top-0 text-white flex flex-col gap-2 justify-between w-full h-full p-4">
                <h1 className="text-lg font-medium">Sewaverse</h1>
                <div>
                  <h2 className="text-3xl leading-10">
                    <span className="block">Get</span>
                    <span className="block">Every Services</span>
                    <span className="block">You Want!</span>
                  </h2>
                  <p className="text-sm font-work-sans font-normal">
                    Book reliable pros for anything from plumbing to personal
                    care, all in one easy platform.
                  </p>
                </div>
              </div>
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
