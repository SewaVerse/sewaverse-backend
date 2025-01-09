interface RatingReviewsProps {
  overallRating: number;
  totalRatings: number;
  ratingDistribution: {
    rating: number;
    count: number;
    reviews: number;
  }[];
  className?: string;
}

import { StarRating } from "./star-rating";

export function RatingReviews({
  overallRating,
  totalRatings,
  ratingDistribution,
  className = "",
}: RatingReviewsProps) {
  const maxCount = Math.max(...ratingDistribution.map((item) => item.count));

  return (
    <div className={`w-full max-w-8xl ${className}`}>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Rating & Reviews</h2>
          <p className="text-sm text-muted-foreground">
            Rating ({totalRatings})
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left column - Overall rating */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="text-4xl font-bold">
              {overallRating.toFixed(1)}
            </span>
            <StarRating rating={overallRating} size="lg" className="mb-1" />
            <span className="text-sm text-muted-foreground">
              {totalRatings.toLocaleString()} Ratings
            </span>
          </div>

          {/* Right column - Rating distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div
                key={item.rating}
                className="grid grid-cols-[2rem_1fr_8rem] gap-2 items-center"
              >
                <span className="text-sm font-medium">
                  {item.rating.toFixed(1)}
                </span>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden ">
                  <div
                    className="h-full bg-brand-gradient rounded-full"
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground text-right">
                  {item.reviews.toLocaleString()} Reviews
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
