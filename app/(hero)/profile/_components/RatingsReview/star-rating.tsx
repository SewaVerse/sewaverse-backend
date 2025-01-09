interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

import { Star } from "lucide-react";

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  className = "",
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of ${maxStars} stars`}
    >
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size]} ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
