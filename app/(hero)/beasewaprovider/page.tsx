import { DollarSign, LockIcon, Phone } from "lucide-react";
import Image from "next/image";
import { GiExpander, GiWatch } from "react-icons/gi";
import { IoIosRocket } from "react-icons/io";

import { Button } from "@/components/ui/button";
const imageIcon = "/images/servicesImage/about-us.svg";
const page = () => {
  return (
    <div>
      <h1 className="md:text-4xl font-semibold gradient-text text-center py-3">
        Join the Service Revolution
      </h1>
      <p className="md:text-2xl text-center ">Empower Your Business Journey</p>

      <div className="md:px-12 py-4 px-2">
        <div className="relative">
          <Image
            src={imageIcon}
            alt="image1"
            height={1}
            width={1}
            className="object-cover w-full h-auto rounded-2xl "
          />
          <div className="   md:h-auto md:justify-center  md:ml-[500px] border-l md:mt-20 md:mb-20 absolute md:top-40 top-0 md:left-52 left-2 ">
            <div className="flex md:items-center gap-2 px-2">
              <GiExpander color="white" size={20} />
              <p className="text-white font-semibold md:text-lg">
                Expand Your Reach:{" "}
                <span className="font-normal">
                  Connect with a wider audience and grow your business.
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 px-2 md:py-4">
              <DollarSign color="white" size={24} />
              <p className="text-white md:text-lg">
                <span className="font-semibold">Earn More, Stress Less:</span>{" "}
                Focus on delivering excellent services while we handle the rest.
              </p>
            </div>

            <div className="text-white md:text-lg  md:py-4 flex gap-2 md:items-center px-2">
              <GiWatch size={24} />
              <p>
                <span className="font-semibold"> Flexible Work: </span> Choose
                your own hours and work on your own terms.
              </p>
            </div>
            <div className="text-white md:text-lg md:py-4 flex md:items-center px-2 gap-2">
              <IoIosRocket size={24} />
              <p>
                <span className="font-semibold">Simplified Onboarding:</span>A
                simple and quick registration process to get you started.
              </p>
            </div>
            <div className="text-white md:text-lg md:py-4 flex md:items-center gap-2 px-2">
              <LockIcon size={24} />
              <p>
                <span className="font-semibold">Secure Payments:</span>Reliable
                payment processing to ensure timely and secure transactions.
              </p>
            </div>
            <div className="text-white md:text-lg flex md:items-center gap-2 px-2">
              <Phone />
              <p>
                <span className="font-semibold">Dedicated Support: </span> Our
                team is here to assist you whenever you need.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center py-2">
        <h1> Start now !</h1>
        <Button variant={"brand"} className="mt-2 mb-4">Be a Sewa-provider</Button>
      </div>
    </div>
  );
};

export default page;
