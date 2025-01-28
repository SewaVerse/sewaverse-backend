import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SewaCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="p-0">
            <div className="relative aspect-[16/9]">
              <Skeleton className="w-full h-full rounded-t-lg" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <Skeleton className="h-6 w-20" /> {/* Price badge */}
                <Skeleton className="h-8 w-8 rounded-full" />{" "}
                {/* Heart button */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-40 mb-1" /> {/* Title */}
                  <Skeleton className="h-4 w-32" /> {/* Description */}
                </div>
                <Skeleton className="h-6 w-12 rounded" /> {/* Rating */}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-2 pt-2 flex justify-between items-center border-t">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />{" "}
              {/* Provider image */}
              <div className="flex flex-col items-start">
                <Skeleton className="h-4 w-24 mb-1" /> {/* Provider name */}
                <Skeleton className="h-4 w-20" /> {/* Location */}
              </div>
            </div>
            <Skeleton className="h-8 w-20" /> {/* Book now button */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
