import clsx from "clsx";
import { Edit } from "lucide-react";
import Link from "next/link";

import useHash from "@/hooks/useHash";

import { ProfileResponse } from "../page";
import AwardsAndAchievements from "./AwardsAndAchievements";
import LicenseSection from "./License";
import WorksSection from "./MyWorks";
import QuestionsList from "./QuestionAnswer/question-list";
import { RatingReviews } from "./RatingsReview/ratings-reviews";
import Reviews from "./RatingsReview/reviews";
import WorkExperienceSection from "./WorkExperience.tsx/WorkExperience";

const ratingData = {
  overallRating: 4.0,
  totalRatings: 100,
  ratingDistribution: [
    { rating: 5.0, count: 5000, reviews: 2000 },
    { rating: 4.0, count: 3000, reviews: 2000 },
    { rating: 3.0, count: 1000, reviews: 2000 },
    { rating: 2.0, count: 700, reviews: 2000 },
    { rating: 1.0, count: 300, reviews: 2000 },
  ],
};

type ProfileDetailsProps = Pick<
  ProfileResponse,
  "profile" | "workExperiences" | "awards" | "licenses" | "myWorks"
>;

const Links = [
  {
    name: "About Me",
    href: "#about-me",
    default: true,
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Awards & Achievements",
    href: "#awards-achievements",
  },
  {
    name: "My Works",
    href: "#my-works",
  },
  {
    name: "Ratings & Reviews",
    href: "#ratings-reviews",
  },
  {
    name: "Offered Services",
    href: "#offered-services",
  },
];

const ProfileNavigationSection = () => {
  const hash = useHash();

  return (
    <div className="my-5">
      <span className="flex justify-between font-semibold text-[12px] sm:text-[12px] md:text-base text-muted-foreground w-full">
        {Links.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className={clsx(
              "font-bold",
              !hash && link.default && "gradient-text",
              hash === link.href.split("#")[1] && "gradient-text"
            )}
          >
            {link.name}
          </Link>
        ))}
      </span>
    </div>
  );
};

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  profile,
  workExperiences,
  awards,
  licenses,
  myWorks,
}) => {
  return (
    <div className="px-[1.3rem]">
      <div className="sticky  bg-white top-0 z-20 py-0.5">
        <ProfileNavigationSection />
      </div>
      <div className="[&>div]:scroll-mt-[3.5rem] flex flex-col gap-4">
        <div id="about-me">
          <span className="flex justify-between items-center py-2 text-sm sm:text-sm md:text-lg">
            <h1 className="font-bold text-2xl">About Me</h1>
            <Edit size={14} />
          </span>

          <p className="text-justify text-[12px] sm:text-[13px] md:text-base">
            {profile.about}
          </p>
        </div>
        {/* work experience section */}
        <div id="experience">
          <WorkExperienceSection experiences={workExperiences} />
        </div>
        {/* license section */}

        <div id="licenses">
          <LicenseSection licenses={licenses} />
        </div>
        {/* awards section */}
        <div id="awards-achievements">
          <AwardsAndAchievements awards={awards} />
        </div>
        <div id="my-works">
          <WorksSection myWorks={myWorks} />
        </div>
        <div id="ratings-reviews">
          <RatingReviews {...ratingData} />
        </div>
        <div>
          <Reviews />
        </div>
        <div>
          <QuestionsList />
        </div>
      </div>
    </div>
  );
};
