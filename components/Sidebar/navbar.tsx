import MobileSidebar from "./mobile-sidebar";
import { MdNotifications } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex flex-row-reverse shadow-sm items-center pr-8 w-full">
      <MobileSidebar />
      <MdNotifications size={30} />
    </div>
  );
};

export default Navbar;
