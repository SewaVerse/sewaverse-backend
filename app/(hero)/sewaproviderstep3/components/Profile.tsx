
import { CameraIcon, VerifiedIcon } from "lucide-react";
import { CiMenuKebab } from "react-icons/ci";

import { Button } from '@/components/ui/button';


const Profile = () => {
  return (
    <div>
         <div className="flex justify-center  items-center -mt-44 ">
                    <div className="w-[701px] h-auto border bg-gray-50 shadow-2xl  rounded-[34px] cursor-not-allowed">
                      <div className="flex items-center gap-10 p-4">
                        <div className="w-[180px] h-[180px] border-[5px] bg-[#BCBDDC] rounded-full relative">
                          <div className="absolute bottom-0 cursor-pointer p-1 border right-5 bg-white rounded-full">
                            <CameraIcon />
                          </div>
                        </div>
        
                        <div>
                          <h1 className="text-5xl text-[#023994] font-semibold relative">
                            Bishal Shrestha
                            <div className="absolute right-0 top-0 ">
                              <VerifiedIcon color="green" />
                            </div>
                          </h1>
        
                          <div className="flex items-center gap-4 text-base">
                            <p>Join on: 5th Jan, 2024 </p>
                            <span>|</span>
                            <p>100 Services Delivered</p>
                          </div>
                          <div className="flex items-center justify-between text-lg text-[#5C5C5C]">
                            <p className="flex-1">Profession</p>
                            <p className="flex-1">Experience</p>
                            <p className="flex-1">Rating</p>
                          </div>
                          <div className="flex items-center justify-between text-xl font-semibold ">
                            <p className="flex-1 gradient-text">Barber</p>
                            <p className="flex-1 gradient-text">5 Years</p>
                            <p className="flex">⭐⭐⭐⭐ <span className="">4.5</span></p>
                          </div>
                          <div className="text-xl ">
                            <h3 className="text-muted-foreground">Offered services</h3>
                          </div>
                          <div className="flex gap-2">
                            <p className="gradient-text text-xl  font-semibold">
                              Hair Cutting
                            </p>
                          </div>
                          <h3 className="text-xl font-normal">Location of services</h3>
                          <div className="text-xl font-bold gradient-text">
                            <span>Kathmandu, Bhaktapur, Lalitpur</span>
                          </div>
                          <h3 className="text-xl font-normal">Core Skills</h3>
                          <div className="flex gap-2 items-center p-1 relative cursor-not-allowed">
                            <Button variant="brand" className="cursor-not-allowed">Hair Dressing</Button>
                            <Button variant="brand" className="cursor-not-allowed">Hair Colouring</Button>
                            <Button variant="brand" className="cursor-not-allowed">Hair Cutting</Button>
                            <CiMenuKebab
                              size={30}
                              className="rotate-90 absolute right-[-80px] top-6  "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    </div>
  )
}

export default Profile