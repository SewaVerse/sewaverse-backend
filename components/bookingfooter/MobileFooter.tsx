"use client"

import { Heart } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GrChatOption } from "react-icons/gr";

import { Button } from "../ui/button";

const sewaverseIcon = "/images/logo.svg";



const MobileFooter = () => {
  const pathName = usePathname()
  console.log(pathName)
  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t">
      <nav>
        <div className="flex items-center justify-between px-5 py-3">
          {/* Icon Section */}
          <div className="flex flex-col items-center">
            <Image
              src={sewaverseIcon}
              alt="Sewaverse"
              width={30}
              height={30}
              className="w-[30px] h-[30px]"
            />
            <p className="text-xs text-center">Sewaverse</p>
          </div>

          {/* Chat Icon */}
          <div className="flex flex-col items-center">
            <GrChatOption size={20} />
            <p className="text-xs">Chat</p>
          </div>

          {/* Wishlist Button */}
          <div>
            <Button variant="outline" className="gap-1">
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </Button>
          </div>

          {/* Book Now Button */}
          {
            pathName === "/tryfooter" &&
            (
              <div>
            
              <Button variant={"brand"}>Book now</Button>
            </div>

            ) 
          }
          
        </div>
      </nav>
    </div>
  );
};

export default MobileFooter;
