"use client";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

// Define types for the section and subsections
interface Section {
  title: string;
  key: string;
  url: string;
  subsections?: string[];
}

interface LeftSideProps {
  activeSubsection: string;
  activeSection: string;
  setActiveSubsection: Dispatch<SetStateAction<string>>;
  setActiveSection: Dispatch<SetStateAction<string>>;
}

const LeftSide = ({
  activeSubsection,
  activeSection,
  setActiveSubsection,
  setActiveSection,
}: LeftSideProps) => {
  const sections: Section[] = [
    {
      title: "My Account",
      key: "myAccount",
      url: "/userprofile",
    },
    {
      title: "My Bookings",
      key: "myBookings",
      url: "/userprofile/bookings",
    },
    {
      title: "My Wishlist & Favourite Sewa Providers",
      key: "wishlist",
      url: "/userprofile/wishlist",
    },
    { title: "My Reviews", key: "reviews", url: "/userprofile/review" },
    { title: "Offers & Promocodes", key: "offers", url: "/userprofile/offers" },
    {
      title: "Leadership Board",
      key: "leadership",
      url: "/userprofile/leadership",
    },
  ];

  const handleSectionClick = (key: string) => {
    setActiveSection(key); // Set the active section
  };

  const handleSubsectionClick = (subsection: string, sectionKey: string) => {
    setActiveSubsection(subsection);
    setActiveSection(sectionKey);
  };

  return (
    <div className="  border  ">
      <div className="p-4">
        {sections.map((section) => (
          <Link key={section.key} href={section.url}>
            <div className="pt-2">
              <h1
                onClick={() => handleSectionClick(section.key)}
                className={`cursor-pointer text-2xl font-semibold ${
                  activeSection === section.key ? "gradient-text" : ""
                }`}
              >
                {section.title}
              </h1>
              {activeSection === section.key && section.subsections && (
                <div className="pl-4 text-gray-500 text-lg font-medium">
                  {section.subsections.map((subsection) => (
                    <p
                      key={subsection}
                      onClick={() =>
                        handleSubsectionClick(subsection, section.key)
                      }
                      className={`cursor-pointer ${
                        activeSubsection === subsection
                          ? "gradient-text font-bold"
                          : ""
                      }`}
                    >
                      {subsection}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
