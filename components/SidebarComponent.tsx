// "use client";

// import { HomeIcon } from "@radix-ui/react-icons";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useState } from "react";
// import { FaUser } from "react-icons/fa";
// import { FiLogOut, FiArrowLeft, FiArrowRight } from "react-icons/fi";
// import {
//   MdBarChart,
//   MdManageAccounts,
//   MdMedicalServices,
// } from "react-icons/md";

// const Sidebar: React.FC = () => {
//   const pathname = usePathname();
//   const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const isActive = (href: string) => pathname === href;

//   return (
//     <div
//       className={`h-screen transition-all bg-white text-gray-800 flex flex-col items-center shadow-lg ${
//         isSidebarCollapsed ? "w-20" : "w-80"
//       }`}
//     >
//       <div className="p-4 flex items-center justify-between w-full">
//         <span
//           className={`ml-2 text-xl font-bold transition-opacity ${
//             isSidebarCollapsed ? "opacity-0" : "opacity-100"
//           }`}
//         >
//           LOGO
//         </span>
//         <button
//           className="p-2 rounded-full hover:bg-gray-200"
//           onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
//         >
//           {isSidebarCollapsed ? (
//             <FiArrowRight className="w-5 h-5" />
//           ) : (
//             <FiArrowLeft className="w-5 h-5" />
//           )}
//         </button>
//       </div>

//       <nav className="flex-1 w-full flex justify-center pl-16">
//         <ul className="space-y-8 w-full">
//           {[
//             { href: "/serviceprovider", label: "Dashboard", Icon: HomeIcon },
//             { href: "/report", label: "Report", Icon: MdBarChart },
//             {
//               href: "/serviceprovider/sewa-management",
//               label: "Sewa Management",
//               Icon: MdMedicalServices,
//             },
//             {
//               href: "/user-management",
//               label: "User Management",
//               Icon: MdManageAccounts,
//             },
//             { href: "/profile", label: "Profile", Icon: FaUser },
//             { href: "/", label: "Logout", Icon: FiLogOut },
//           ].map(({ href, label, Icon }) => (
//             <li
//               key={href}
//               className={`flex items-center w-full ${
//                 isActive(href)
//                   ? "border-r-4 border-primary"
//                   : "border-r-4 border-transparent"
//               }`}
//             >
//               <Link
//                 href={href}
//                 className={`flex items-center w-full p-2 hover:text-primary ${
//                   isActive(href) ? "text-primary" : ""
//                 }`}
//               >
//                 <Icon className="w-5 h-5 mr-2" />
//                 {/* Only display the label if the sidebar is not collapsed */}
//                 {!isSidebarCollapsed && <span>{label}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
