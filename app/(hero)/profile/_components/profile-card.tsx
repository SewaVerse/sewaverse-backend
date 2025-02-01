// import { FiEdit, FiShare2 } from "react-icons/fi";
// import { GoEye } from "react-icons/go";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const ProfileComponent = () => {
//   return (
//     <div className="flex flex-col gap-4 md:flex-row bg-white shadow-2xl mx-4 sm:mx-8 md:mx-30 lg:mx-48 h-auto md:h-auto lg:h-[22rem] justify-between rounded-xl sm:rounded-[2rem] md:rounded-[3rem] lg:rounded-[3rem] p-2 sm:p-2 md:p-4 w-[20rem] sm:w-[20rem] md:w-[55rem]">
//       {/* Avatar Section */}
//       <div className="flex items-center w-1/4 sm:w-1/4 md:w-1/3 sm:justify-items-center md:justify-center">
//         <Avatar className="w-[8.5rem] h-[8.5rem] sm:w-[10rem] sm:h-[10rem] md:w-[10rem] md:h-[10rem] lg:w-[14rem] lg:h-[14rem] border-4 sm:border-4 md:border-8 lg:border-8 border-white shadow-2xl">
//           <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//           <AvatarFallback>CN</AvatarFallback>
//         </Avatar>
//       </div>

//       {/* Profile Details Section */}
//       <div className="flex flex-col w-full gap-1 md:w-2/3 sm:gap-1 md:gap-4 lg:gap-4">
//         {/* Section 1 */}
//         <div className="space-y-1">
//           <h1 className="text-base sm:text-base md:text-2xl lg:text-[40px] font-bold text-[#023994]">
//             Manish Maharjan
//           </h1>
//           <div className="flex flex-row sm:flex-col md:flex-row lg:flex-row font-medium text-xs sm:text-sm md:text-[12px] gap-1 sm:gap-2 md:gap-3 w-full">
//             <p>Joined on: 1st Jan, 2025</p>
//             <p className="text-muted-foreground">|</p>
//             <p>100 Services Delivered</p>
//           </div>
//         </div>

//         {/* Section 2 */}
//         <div className="flex flex-row gap-2 font-medium sm:gap-2 md:gap-16">
//           <span>
//             <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
//               Profession
//             </h1>
//             <p className="gradient-text text-xs sm:text-sm md:text-[20px]">
//               Software Developer
//             </p>
//           </span>
//           <span>
//             <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
//               Experience
//             </h1>
//             <p className="gradient-text text-xs sm:text-sm md:text-[20px]">
//               3 Years
//             </p>
//           </span>
//           <span>
//             <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
//               Ratings
//             </h1>
//             <p className="gradient-text text-xs sm:text-sm md:text-[20px]">
//               4.5
//             </p>
//           </span>
//         </div>

//         {/* Section 3 */}
//         <span className="font-medium">
//           <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
//             Offered Services
//           </h1>
//           <p className="text-xs gradient-text sm:text-sm md:text-base">
//             Hair Cutting
//           </p>
//         </span>

//         {/* Section 4 */}
//         <span className="font-medium">
//           <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
//             Location of Services
//           </h1>
//           <p className="text-xs gradient-text sm:text-sm md:text-base">
//             Kathmandu, Nepal
//           </p>
//         </span>

//         {/* Section 5 */}
//         <span className="font-medium">
//           <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
//             Core Skills
//           </h1>
//           <span className="flex gap-2 sm:gap-2 md:gap-8">
//             <Button
//               variant="brand"
//               className="rounded-lg px-2 py-1 text-xs sm:text-sm md:text-[14px]"
//             >
//               Web Design
//             </Button>
//             <Button
//               variant="brand"
//               className="rounded-lg px-2 py-1 text-xs sm:text-sm md:text-[14px]"
//             >
//               Typescript
//             </Button>
//             <Button
//               variant="brand"
//               className="rounded-lg px-2 py-1 text-xs sm:text-sm md:text-[14px]"
//             >
//               UIUX Design
//             </Button>
//           </span>
//         </span>
//       </div>
//       <div className="flex items-end">
//         <DropdownMenu>
//           <DropdownMenuTrigger className="text-xl font-extrabold">
//             ...
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="font-semibold">
//             <DropdownMenuItem className="flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer hover:bg-gray-100">
//               <FiShare2 className="w-4 h-4" />
//               Share
//             </DropdownMenuItem>
//             <DropdownMenuItem className="flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer hover:bg-gray-100">
//               <FiEdit className="w-4 h-4" />
//               Edit Profile
//             </DropdownMenuItem>
//             <DropdownMenuItem className="flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer hover:bg-gray-100">
//               <GoEye className="w-4 h-4" />
//               View as customer
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// };

// export default ProfileComponent;

"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import { FiEdit, FiShare2 } from "react-icons/fi";
import { GoEye } from "react-icons/go";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFallbackName, getImageUrl } from "@/lib/utils";

import { ProfileResponse } from "../page";
import EditCard from "./EditCard/EditCard";

// const data = {
//   profile: {
//     name: "John Doe",
//     joinedDate: "2022-03-15",
//     ratings: 4.8,
//     offeredServices: ["Plumbing", "Electrical Repair", "Laptop Repairing"],
//     location: "Kathmandu, Nepal",
//     skills: [
//       "Problem-solving",
//       "Teamwork",
//       "Laptop Servicing",
//       "Hair Coloring",
//       "Cleaning",
//     ],
//   },
//   workExperiences: [
//     {
//       jobTitle: "Electrician",
//       company: "ABC Electricals",
//       duration: "3 years",
//       description:
//         "Worked on residential and commercial electrical installations and repairs.",
//     },
//     {
//       jobTitle: "Plumber",
//       company: "XYZ Plumbing Services",
//       duration: "2 years",
//       description:
//         "Specialized in leak repairs, water heater installations, and pipe replacements.",
//     },
//   ],
//   licenses: [
//     {
//       licenseOf: "Plumbing",
//       licenseFrom: "Nepal Plumbing Association",
//       licenseNumber: "PL12345",
//     },
//     {
//       licenseOf: "Electrical Work",
//       licenseFrom: "Nepal Electrical Council",
//       licenseNumber: "EL98765",
//     },
//   ],
//   awards: [
//     {
//       title: "Best Plumber of the Year",
//       awardFrom: "Nepal Plumbing Association",
//       date: "2023",
//     },
//     {
//       title: "Top Technician Award",
//       awardFrom: "XYZ Plumbing Services",
//       date: "2022",
//     },
//   ],
// };

type ProfileComponentProps = { name: string; createdAt: Date } & Pick<
  ProfileResponse,
  "profile" | "serviceCategories"
>;

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  name,
  createdAt,
  profile,
  serviceCategories,
}) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [fallBackName, setFallBackName] = useState<string>("");
  // Dropdown menu items
  const dropdownItems = [
    {
      icon: <FiShare2 className="w-4 h-4" />,
      label: "Share",
      action: () => alert("Share clicked"),
    },
    {
      icon: <FiEdit className="w-4 h-4" />,
      label: "Edit Profile",
      // href: "/profile/edit",
      action: () => setOpenEditCard(true),
    },
    {
      icon: <GoEye className="w-4 h-4" />,
      label: "View as customer",
      action: () => alert("View as Customer clicked"),
    },
  ];

  useEffect(() => {
    const fallBackName = getFallbackName(name);
    setFallBackName(fallBackName);

    if (profile.image) {
      setImageSrc(getImageUrl(profile.image));
    }
  }, [name, profile]);

  const [openEditCard, setOpenEditCard] = useState(false)

  return (
    <div className="flex flex-col gap-4  md:flex-row bg-white shadow-lg mx-4 sm:mx-8 md:mx-30 lg:mx-48 h-auto md:h-auto lg:h-auto justify-between rounded-3xl  p-3  w-[20rem] sm:w-[20rem] md:w-[55rem]">
      {/* Avatar Section */}
      <div className="flex items-center w-1/4 sm:w-1/4 md:w-1/3 sm:justify-items-center md:justify-center">
        <Avatar className="w-[8.5rem] h-[8.5rem] sm:w-[10rem] sm:h-[10rem] md:w-[10rem] md:h-[10rem] lg:w-[12rem] lg:h-[12rem] border-4 sm:border-4 md:border-8 lg:border-8 border-white shadow-2xl">
          <AvatarImage src={imageSrc} alt="Avatar" />
          <AvatarFallback>{fallBackName}</AvatarFallback>
        </Avatar>
      </div>

      {/* Profile Details Section */}
      <div className="flex flex-col w-full gap-1 md:w-2/3 md:gap-2">
        {/* Section 1 */}
        <div className="space-y-1">
          <h2 className="text-base capitalize sm:text-base md:text-4xl font-bold text-[#023994]">
            {name}
          </h2>
          <div className="flex flex-row sm:flex-col md:flex-row lg:flex-row font-medium text-xs sm:text-sm md:text-[12px] gap-1 sm:gap-2 md:gap-3 w-full">
            <p>Joined on: {moment(createdAt).format("LL")}</p>
            <p className="text-muted-foreground">|</p>
            <p>100 Services Delivered</p>
          </div>
        </div>

        {/* section 2 */}

        <div className="flex justify-between max-w-full font-medium">
          <span>
            <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
              Profession
            </h1>
            <span className="flex flex-col gradient-text">
              {profile.profession}
            </span>
          </span>

          <span>
            <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
              Experience
            </h1>
            <span className="flex flex-col gradient-text">
              <p className="text-xs sm:text-sm md:text-base">
                {profile.experience}
              </p>
            </span>
          </span>

          <span>
            <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
              Rating
            </h1>
            <p className="text-xs gradient-text sm:text-sm md:text-base">
              {profile.overallRating}
            </p>
          </span>
        </div>

        {/* Section 3: Offered Services */}
        <span className="font-medium">
          <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
            Offered Services
          </h1>
          <p className="text-xs gradient-text sm:text-sm md:text-base">
            {serviceCategories.map((category) => category.name).join(", ")}
          </p>
        </span>

        {/* Section 4: Location of Services */}
        <span className="font-medium">
          <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
            Location of Services
          </h1>
          <p className="text-xs gradient-text sm:text-sm md:text-base">
            {profile.location}
          </p>
        </span>

        {/* Section 5: Core Skills */}
        <span className="font-medium">
          <h1 className="text-xs text-muted-foreground sm:text-sm md:text-base">
            Core Skills
          </h1>
          <span className="flex flex-wrap gap-2 md:gap-4">
            {profile.skills.map((skill, index) => (
              <Button key={index} variant="brand" className="px-4 py-0">
                {skill}
              </Button>
            ))}
          </span>
        </span>
      </div>

      {/* Dropdown Menu */}
      <div className="flex items-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-xl font-extrabold">
            ...
          </DropdownMenuTrigger>

          <DropdownMenuContent className="font-semibold">
            {dropdownItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={item.action}
                className="flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer hover:bg-gray-100"
                
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <EditCard open={openEditCard} onOpenChange={setOpenEditCard}/>
      </div>
    </div>
  );
};

export default ProfileComponent;
