import { Edit } from "lucide-react";

import AwardsAndAchievements from "./AwardsAndAchievements";
import WorksSection from "./MyWorks";
import QuestionsList from "./QuestionAnswer/question-list";
import { RatingReviews } from "./RatingsReview/ratings-reviews";
import Reviews from "./RatingsReview/reviews";
import WorkExperience from "./WorkExperience.tsx/WorkExperience";

const experiences = [
  {
    title: "Backend Developer",
    subtitle: "Web Developer",
    duration: "More than 3 years",
    documentLink: "#",
  },
  {
    title: "Frontend Developer",
    subtitle: "Web Developer",
    duration: "2 years",
    documentLink: "#",
  },
];

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

export const ProfileDetails = () => {
  return (
    <div className="px-[1.3rem]">
      <span className="flex justify-between font-semibold text-[12px] sm:text-[12px] md:text-base text-muted-foreground w-full">
        <h1>About</h1>
        <h1>Experience</h1>
        <h1>Awards & Achievements</h1>
        <h1>My Works</h1>
        <h1>Ratings & Reviews</h1>
        <h1>Offered Services</h1>
      </span>
      <span>
        <span className="flex justify-between items-center py-2 text-sm sm:text-sm md:text-lg">
          <h1 className="font-bold text-2xl">About Me</h1>
          <Edit size={14} />
        </span>

        <p className="text-justify text-[12px] sm:text-[13px] md:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic tempora
          minus laborum magnam error tempore est sit a! Neque nihil nisi iure
          excepturi ipsa ipsam, hic nesciunt voluptatibus necessitatibus ullam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          repudiandae itaque, inventore aperiam explicabo distinctio praesentium
          facere temporibus commodi quasi impedit cupiditate quaerat,
          repellendus at sint reprehenderit reiciendis totam ullam?
        </p>
      </span>

      {/* work experience section */}

      <WorkExperience experiences={experiences} />

      {/* license section */}

      <div>
        <span className="flex justify-between items-center py-2 ">
          <h1 className="font-bold text-2xl">License</h1>
          <Edit size={14} />
        </span>
        <div className="flex justify-between items-center shadow-neutral-500 rounded-xl border p-1 w-[29.8125rem] px-4">
          <div>
            <h1 className="text-xl font-semibold">Backend Developer</h1>
            <p className="text-muted-foreground font-medium text-sm">
              License form ABC Institute
            </p>
          </div>
          <div className="border h-[67px] w-[99px] "></div>
        </div>
      </div>

      {/* awards section */}

      <div>
        <AwardsAndAchievements />
      </div>

      <div>
        <WorksSection />
      </div>
      <div>
        <RatingReviews {...ratingData} />
      </div>
      <div>
        <Reviews />
      </div>
      <div>
        <QuestionsList />
      </div>
    </div>
  );
};
