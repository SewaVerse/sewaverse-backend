"use client";

import { SidebarItem } from "./sidebar-item";
import { logout } from "@/actions/logout";
import {
  BarChart,
  Calendar,
  Layout,
  LogOut,
  Settings,
  User2,
} from "lucide-react";
import { toast } from "sonner";

const serviceProviderRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/serviceprovider",
  },

  {
    icon: BarChart,
    label: "Reports",
    href: "/serviceprovider/reports",
  },
  {
    icon: Calendar,
    label: "Sewa Management",
    href: "/serviceprovider/sewa-management",
  },
  {
    icon: User2,
    label: "User Management",
    href: "/serviceprovider/user-management",
  },
  {
    icon: User2,
    label: "User Profile",
    href: "/serviceprovider/profile",
  },

  {
    icon: Settings,
    label: "Configuration",
    href: "/serviceprovider/settings",
  },

  {
    icon: LogOut,
    label: "Logout",
    href: "/",
    func: async () => {
      await logout();
      setTimeout(() => {
        toast("You have been logged out successfully!");
      }, 5000);
    },
  },
];

export const SidebarRoutes = () => {
  const routes = serviceProviderRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          func={route?.func}
        />
      ))}
    </div>
  );
};
