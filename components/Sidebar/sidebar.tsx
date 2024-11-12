// import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col gap-6 bg-white shadow-sm">
      <div className="p-6">
        {/* <Logo /> */}
        Logo
      </div>
      <div className="flex flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
