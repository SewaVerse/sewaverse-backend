// import { CameraIcon, VerifiedIcon } from "lucide-react";
// import { CiMenuKebab } from "react-icons/ci";
// import { Button } from "@/components/ui/button";

// interface ProfileProps {
//   name: string;
//   joinDate: string;
//   servicesDelivered: number;
//   profession: string;
//   experience: string;
//   rating: number;
//   offeredServices: string[];
//   locations: string[];
//   coreSkills: string[];
//   imageUrl: string; // Add imageUrl prop
// }

// const ProfileCard = ({
//   name,
//   joinDate,
//   servicesDelivered,
//   profession,
//   experience,
//   rating,
//   offeredServices,
//   locations,
//   coreSkills,
//   imageUrl, // Destructure imageUrl prop
// }: ProfileProps) => {
//   return (
//     <div className="flex justify-center items-center mt-10 md:mt-0">
//       <div className="w-full max-w-4xl border bg-gray-50 shadow-2xl rounded-2xl p-6 md:p-10">
//         <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
//           <div className="w-36 h-36 md:w-44 md:h-44 border-4 bg-[#BCBDDC] rounded-full relative">
//             {imageUrl ? (
//               <img
//                 src={imageUrl}
//                 alt="Profile"
//                 className="w-full h-full rounded-full object-cover"
//               />
//             ) : (
//               <div className="absolute bottom-0 right-2 md:right-5 p-1 border bg-white rounded-full cursor-pointer">
//                 <CameraIcon />
//               </div>
//             )}
//           </div>

//           <div className="flex-1">
//             <h1 className="text-3xl md:text-5xl text-[#023994] font-semibold relative">
//               {name}
//               <div className="absolute right-0 top-0">
//                 <VerifiedIcon color="green" />
//               </div>
//             </h1>

//             <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-base mt-2">
//               <p>Join on: {joinDate}</p>
//               <span className="hidden md:inline">|</span>
//               <p>{servicesDelivered} Services Delivered</p>
//             </div>
//             <div className="flex flex-col md:flex-row items-center justify-between text-lg text-[#5C5C5C] mt-4">
//               <p className="flex-1">Profession</p>
//               <p className="flex-1">Experience</p>
//               <p className="flex-1">Rating</p>
//             </div>
//             <div className="flex flex-col md:flex-row items-center justify-between text-xl font-semibold mt-2">
//               <p className="flex-1 gradient-text">{profession}</p>
//               <p className="flex-1 gradient-text">{experience}</p>
//               <p className="flex">
//                 ⭐⭐⭐⭐ <span>{rating}</span>
//               </p>
//             </div>
//             <div className="text-xl mt-4">
//               <h3 className="text-muted-foreground">Offered services</h3>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {offeredServices.map((service, index) => (
//                 <p key={index} className="gradient-text text-xl font-semibold">
//                   {service}
//                 </p>
//               ))}
//             </div>
//             <h3 className="text-xl font-normal mt-4">Location of services</h3>
//             <div className="text-xl font-bold gradient-text mt-2">
//               {locations.join(", ")}
//             </div>
//             <h3 className="text-xl font-normal mt-4">Core Skills</h3>
//             <div className="flex flex-wrap gap-2 items-center p-1 relative cursor-not-allowed mt-2">
//               {coreSkills.map((skill, index) => (
//                 <Button
//                   key={index}
//                   variant="brand"
//                   className="cursor-not-allowed"
//                 >
//                   {skill}
//                 </Button>
//               ))}
//               <CiMenuKebab
//                 size={30}
//                 className="rotate-90 absolute right-[-20px] md:right-[-80px] top-6"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;

"use client";

import { CameraIcon, Star, VerifiedIcon } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "./ui/button";

interface ProfileProps {
  name: string;
  joinDate: string;
  servicesDelivered: number;
  profession: string;
  experience: string;
  rating: number;
  offeredServices: string[];
  locations: string[];
  coreSkills: string[];
  imageUrl?: string;
}

export function ProfileCard({
  name,
  joinDate,
  servicesDelivered,
  profession,
  experience,
  rating,
  offeredServices,
  locations,
  coreSkills,
  imageUrl,
}: ProfileProps) {
  return (
    <Card className="w-full max-w-4xl bg-gray-50 shadow-2xl rounded-2xl m-2">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-36 h-36 md:w-44 md:h-44 border-4 border-white shadow-2xl bg-[#BCBDDC] rounded-full relative flex-shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Profile"
                width={176}
                height={176}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="absolute bottom-0 right-2 md:right-5 p-1 border bg-white rounded-full cursor-pointer">
                <CameraIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex justify-around md:justify-start items-center ">
              <div className="text-2xl md:text-4xl font-semibold flex text-center">
                <h1 className="gradient-text">{name}</h1>
                <VerifiedIcon className="w-6 h-6 text-green-500" />
              </div>
              {/* <div className="flex items-center gap-2">
                <VerifiedIcon className="w-6 h-6 text-green-500" />
                <MoreVertical className="w-6 h-6 text-gray-500" />
              </div> */}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2 text-muted-foreground font-medium">
              <p className="text-sm md:text-base">Joined on: {joinDate}</p>
              <span className="hidden md:inline">|</span>
              <p className="text-sm md:text-base">
                {servicesDelivered} Services Delivered
              </p>
            </div>

            <div className="flex gap-4 mt-4 font-medium justify-between">
              <div>
                <p className="text-lg text-muted-foreground">Profession</p>
                <h1 className="text-lg gradient-text font-semibold">
                  {profession}
                </h1>
              </div>
              <div>
                <p className="text-lg text-muted-foreground">Experience</p>
                <h1 className="text-lg gradient-text font-semibold">
                  {experience}
                </h1>
              </div>

              <div>
                <p className="text-lg text-muted-foreground">Rating</p>
                <p className="flex items-center text-lg gradient-text font-semibold">
                  {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-1">{rating}</span>
                </p>
              </div>
            </div>

            <div className="mt-3 font-medium">
              <h3 className="text-lg text-muted-foreground ">
                Offered services
              </h3>
              <div className="flex flex-wrap gap-2">
                {offeredServices.map((service, index) => (
                  <h1
                    key={index}
                    className="text-lg font-semibold gradient-text"
                  >
                    {service}
                  </h1>
                ))}
              </div>
            </div>

            <div className="mt-3 font-medium">
              <h3 className="text-lg text-muted-foreground">
                Location of services
              </h3>
              <h1 className="text-lg font-semibold gradient-text">
                {locations.join(", ")}
              </h1>
            </div>

            <div className="mt-3 font-medium">
              <h3 className="text-lg text-muted-foreground">Core Skills</h3>
              <div className="flex flex-wrap gap-2 items-center p-1 relative">
                {coreSkills.map((skill, index) => (
                  <Button key={index} variant="brand" size={"sm"}>
                    {skill}
                  </Button>
                ))}
                {/* <MoreVertical className="w-6 h-6 text-gray-500 absolute right-[-20px] md:right-[-40px] top-6" /> */}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
