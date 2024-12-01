import { SidebarRoutes } from "./sidebar-routes";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col gap-6 bg-white shadow-sm">
      <div className="p-8 flex justify-center">
        <Image
          src={"/images/Sewaverse-02.jpg"}
          alt="logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
