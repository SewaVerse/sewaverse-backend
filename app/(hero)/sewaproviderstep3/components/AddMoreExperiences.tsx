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

interface Experience {
  id: number;
  title: string;
  category: string;
  duration: string;
}
interface AddMoreExperiencesProps {
  openAddMoreExperience: boolean;
  setOpenAddMoreExperience: (open: boolean) => void;
}

export default function AddMoreExperiences({
  openAddMoreExperience,
  setOpenAddMoreExperience,
}: AddMoreExperiencesProps) {
  const [experiences, setExperiences] = React.useState<Experience[]>([
    {
      id: 1,
      title: "Hair Dresser",
      category: "Beauty & Personal care(Male)",
      duration: "More than 5 years",
    },
    {
      id: 2,
      title: "Hair Dresser",
      category: "Beauty & Personal care(Male)",
      duration: "More than 5 years",
    },
  ]);

  return (
    <Dialog
      open={openAddMoreExperience}
      onOpenChange={setOpenAddMoreExperience}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-center max-w-[300px] mx-auto">
              Add your relevant experiences to stand out even more!
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <button
            className="w-full border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors"
            onClick={() => {
              // Add experience logic here
            }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="text-green-500">
                <CirclePlus />
              </span>
              Add Experience
            </div>
          </button>

          <div className="space-y-3">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="p-4 bg-gray-50 rounded-lg space-y-2 border-[2px]"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {experience.category}
                    </p>
                  </div>
                  <span className="text-sm text-indigo-600">
                    {experience.duration}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-indigo-600"
                  >
                    View Document
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Button
              onClick={() => setOpenAddMoreExperience(false)}
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
