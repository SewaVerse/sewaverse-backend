import MobileSidebar from "./mobile-sidebar";
import { auth } from "@/auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, MessageCircleMore } from "lucide-react";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="p-4 border-b gap-4 h-full flex flex-row-reverse shadow-sm bg-white items-center pr-8 w-full">
      <MobileSidebar />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="/images/Sewaverse-02.jpg" />
          </Avatar>
          <DropdownMenuContent className="right-0 transform -translate-x-8">
            <DropdownMenuLabel className="flex flex-col space-y-1">
              {session?.user?.name}
              <span className="text-xs text-gray-700">
                {session?.user?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Logout</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenuTrigger>
      </DropdownMenu>

      <Bell size={24} />
      <MessageCircleMore />
    </div>
  );
};

export default Navbar;
