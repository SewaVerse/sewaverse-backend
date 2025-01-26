"use client";
import { useState } from "react";

import LeftSide from "./_components/LeftSide";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeSubsection, setActiveSubsection] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("myAccount");
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 px-5 md:px-16 py-5">
      <h1 className="md:hidden block cursor-pointer" onClick={toggleMenu}>
        menu
      </h1>

      {/* LeftSide is shown/hidden based on menuVisible */}
      <div
        className={`md:block ${
          menuVisible ? "block" : "hidden"
        } md:basis-1/4 h-full`}
      >
        <LeftSide
          activeSubsection={activeSubsection}
          activeSection={activeSection}
          setActiveSubsection={setActiveSubsection}
          setActiveSection={setActiveSection}
        />
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default UserLayout;
