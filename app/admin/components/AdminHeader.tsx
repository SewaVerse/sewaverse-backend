import Image from "next/image";
import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";

const AdminHeader = () => {
  return (
    <div className="flex gap-2 py-2 bg-gray-100">
      {" "}
      <SidebarTrigger />
      <Link href={"/"}>
        <Image
          src="/images/logo.svg"
          width={45}
          height={40}
          alt="sewaverse logo"
        />
      </Link>
    </div>
  );
};

export default AdminHeader;
