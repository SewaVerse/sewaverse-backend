// import { Star } from "lucide-react";
// import Image from "next/image";

// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";

// import { ProfileData } from "../../../../lib/types";

// interface ProfileCardProps {
//   data: ProfileData;
// }

// export function ProfileCardEditor({ data }: ProfileCardProps) {
//   return (
//     <Card className="p-6">
//       <div className="flex gap-6">
//         <div className="relative w-[140px] h-[140px]">
//           {data.profileImage ? (
//             <Image
//               src={data.profileImage}
//               alt="Profile"
//               fill
//               className="rounded-full object-cover border-4 border-white shadow-lg"
//             />
//           ) : (
//             <div className="w-full h-full rounded-full bg-gray-200 border-4 border-white shadow-lg" />
//           )}
//         </div>

//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-2xl font-bold text-[#0041C2]">{data.name}</h1>
//               <p className="text-gray-600 text-sm">
//                 Joined on: {data.joinedDate} · {data.servicesDelivered} Services
//                 Delivered
//               </p>
//             </div>
//           </div>

//           <div className="mt-4 grid grid-cols-3 gap-6">
//             <div>
//               <p className="text-gray-600">Profession</p>
//               <p className="text-[#0041C2] font-medium">{data.profession}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Experience</p>
//               <p>{data.experience}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Rating</p>
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < Math.floor(data.rating)
//                         ? "fill-[#0041C2] text-[#0041C2]"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//                 <span className="ml-1">{data.rating}</span>
//               </div>
//             </div>
//           </div>

//           <div className="mt-4">
//             <p className="text-gray-600">Offered services</p>
//             <div className="mt-1">
//               {data.offeredServices.map((service) => (
//                 <span key={service} className="text-[#0041C2]">
//                   {service}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="mt-4">
//             <p className="text-gray-600">Location of services</p>
//             <p>{data.location.join(", ")}</p>
//           </div>

//           <div className="mt-4">
//             <p className="text-gray-600">Core Skills</p>
//             <div className="flex gap-2 mt-1">
//               {data.coreSkills.map((skill) => (
//                 <Badge
//                   key={skill}
//                   className="bg-[#0041C2] text-white hover:bg-[#0041C2]/90"
//                 >
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }
