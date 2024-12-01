"use client";

import { SidebarItem } from "./sidebar-item";
import { logout } from "@/actions/logout";
import {
  BarChart,
  Calendar,
  ChartNoAxesColumn,
  Layout,
  LayoutDashboard,
  LogOut,
  Settings,
  User2,
  UserRoundPen,
} from "lucide-react";
import { toast } from "sonner";

const serviceProviderRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/serviceprovider/dashboard",
  },

  {
    icon: ChartNoAxesColumn,
    label: "Reports",
    href: "/serviceprovider/reports",
  },
  {
    icon: Calendar,
    label: "Sewa Management",
    href: "/serviceprovider/sewa-management",
  },
  {
    icon: UserRoundPen,
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
    label: "Settings",
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
