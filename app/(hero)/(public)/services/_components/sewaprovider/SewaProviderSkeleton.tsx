"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {[...Array(8)].map((_, index) => (
        <Card
          key={index}
          className="w-full mx-auto hover:shadow-lg transition-shadow"
        >
          <CardHeader className="p-0">
            <div className="relative aspect-[16/9]">
              <Skeleton className="w-full h-full rounded-t-lg" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div>
                  <Skeleton className="h-5 w-32 mb-1 bg-white/50" />
                  <Skeleton className="h-4 w-24 bg-white/50" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full bg-white/50" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-4 w-40 mb-2" />
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-6 w-12 rounded" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-2 pt-2 flex justify-between gap-1 items-center border-t">
            <div className="flex flex-col">
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-1" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex items-center mt-1">
                <Skeleton className="h-4 w-4 mr-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-8 w-20 rounded" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
