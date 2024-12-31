type CalculateOverallRatingProps = {
  oldOverallRating: number;
  oldRatingCount: number;
  newRating: number;
  oldRating?: number; // Optional, for updates
};

export const calculateOverallRating = ({
  oldOverallRating,
  oldRatingCount,
  newRating,
  oldRating,
}: CalculateOverallRatingProps): number => {
  let totalRating = oldOverallRating * oldRatingCount;

  if (oldRating !== undefined) {
    // Update existing rating
    totalRating = totalRating - oldRating + newRating;
    return Number((totalRating / oldRatingCount).toFixed(2));
  }

  // Add new rating
  const newOverallRating =
    (oldOverallRating * oldRatingCount + newRating) / (oldRatingCount + 1);

  return Number(newOverallRating.toFixed(2));
};
