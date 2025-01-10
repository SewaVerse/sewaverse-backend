"use client";

import { CirclePlus } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Work {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface ShowcaseAnotherWorkProps {
  openShowcaseAnotherWork: boolean;
  setOpenShowcaseAnotherWork: (open: boolean) => void;
}

export default function ShowcaseAnotherWork({
  openShowcaseAnotherWork,
  setOpenShowcaseAnotherWork,
}: ShowcaseAnotherWorkProps) {
  const [works] = React.useState<Work[]>([
    {
      id: 1,
      title: "Hair Styling",
      description: "Description",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Hair Styling",
      description: "Description",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  ]);

  return (
    <Dialog
      open={openShowcaseAnotherWork}
      onOpenChange={setOpenShowcaseAnotherWork}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Showcase another work
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <button
            className="w-full border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors"
            onClick={() => {}}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="text-green-500">
                <CirclePlus />
              </span>
              Add Work
            </div>
          </button>

          <div className="space-y-3">
            {works.map((work) => (
              <div
                key={work.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">{work.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {work.description}
                  </p>
                </div>
                <div className="h-12 w-16 relative border">
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    className="object-contain rounded-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setOpenShowcaseAnotherWork(false)}
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
