"use client";

import { ContactRound, Handshake, Home, Music, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

type SidebarLinkProps = {
  title: string;
  url: string;
  icon: string;
};

const icons = { Home, Users, ContactRound, Music, Handshake };

const SidebarLink: React.FC<SidebarLinkProps> = ({ title, url, icon }) => {
  const pathname = usePathname();
  const Icon = icons[icon as keyof typeof icons];

  return (
    <SidebarMenuItem>
      <Link href={url}>
        <SidebarMenuButton isActive={url === pathname}>
          {Icon && <Icon />}
          <span>{title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};

export default SidebarLink;
