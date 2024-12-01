import { Sidebar } from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:opacity-75 transition ">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white w-2/3 text-black">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
