import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import SidebarLink from "./SidebarLink";

type RouteType = {
  title: string;
  url: string;
  icon: string;
};

// Menu items.
export const routes: RouteType[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "Home",
  },
  {
    title: "Services",
    url: "/admin/sewa",
    icon: "Handshake",
  },
];

const AdminSidebar = async () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarLink
                  key={item.url}
                  title={item.title}
                  url={item.url}
                  icon={item.icon} // Pass icon name
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
