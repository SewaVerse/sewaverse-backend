"use client";

import { CirclePlus, Edit } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

import EditWorkExperience from "@/app/(hero)/profile/_components/WorkExperience.tsx/EditExperience";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddWorkExperience from "./AddWorkExperience";

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
  const [experiences] = React.useState<Experience[]>([
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={openAddMoreExperience}
      onOpenChange={setOpenAddMoreExperience}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-center max-w-[300px] mx-auto">
              Work Experience
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <button
            className="w-full p-4 transition-colors border-2 border-dashed rounded-lg hover:bg-gray-50"
            onClick={
              () => setModalOpen(true)

              // Add experience logic here
            }
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
                  <div>
                    <span className="text-sm gradient-text">
                      {experience.duration}
                    </span>
                    <div className="flex flex-col items-end">
                      <div>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-sm text-muted-foreground hover:text-indigo-600"
                        >
                          View Document
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-2 cursor-pointer">
                        <p
                          onClick={() => setOpen(true)}
                          className="flex items-center gap-1 tex-xs"
                        >
                          {" "}
                          <Edit size="14" /> edit
                        </p>
                        <p className="flex items-center text-xs">
                          <MdDelete size={"14"} /> delete
                        </p>
                      </div>
                    </div>
                  </div>
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
      <AddWorkExperience
        modalOpen={modalOpen}
        onOpenChange={setModalOpen}
        onSave={() => {}}
      />
      <EditWorkExperience
        open={open}
        onOpenChange={setOpen}
        onSave={() => {}}
      />
    </Dialog>
  );
}
