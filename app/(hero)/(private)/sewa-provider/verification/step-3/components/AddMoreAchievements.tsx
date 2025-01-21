"use client";

import { CirclePlus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Achievement {
  id: number;
  title: string;
}

interface AddMoreAchievementsProps {
  openMoreAchievements: boolean;
  setOpenMoreAchievements: (open: boolean) => void;
}

export default function AddMoreAchievements({
  openMoreAchievements,
  setOpenMoreAchievements,
}: AddMoreAchievementsProps) {
  const [achievements] = React.useState<Achievement[]>([
    {
      id: 1,
      title: "Hair Styling competition",
    },
    {
      id: 2,
      title: "Hair Styling competition",
    },
  ]);

  return (
    <Dialog open={openMoreAchievements} onOpenChange={setOpenMoreAchievements}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Add more achievements
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <button
            className="w-full border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors"
            onClick={() => {
              // Add more awards logic here
            }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="text-green-500">
                <CirclePlus />
              </span>
              Add More Awards
            </div>
          </button>

          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <span className="text-sm">{achievement.title}</span>
                <div className="h-12 w-16 relative border"></div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setOpenMoreAchievements(false)}
              variant="brand"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
