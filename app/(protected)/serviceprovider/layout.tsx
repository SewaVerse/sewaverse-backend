import Navbar from "@/components/Sidebar/navbar";
import { Sidebar } from "@/components/Sidebar/sidebar";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-60">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-72 pt-[80px]">{children}</main>
    </div>
  );
};

export default Layout;
