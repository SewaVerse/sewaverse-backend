import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import AdminHeader from "./components/AdminHeader";
import AdminSideBar from "./components/AdminSideBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSideBar />
      <main className="w-full h-full">
        <AdminHeader />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
