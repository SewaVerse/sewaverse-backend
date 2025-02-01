"use client";

import { CirclePlus, Edit } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

import EditAward from "@/app/(hero)/profile/_components/Awards/EditAwards";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddAchievements from "./AddAchievements";

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

  //state for the award dialog open
  const [awardOpen, setAwardOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState(false)

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
            className="w-full p-4 transition-colors border-2 border-dashed rounded-lg hover:bg-gray-50"
            onClick={() => {
              // Add more awards logic here
            }}
          >
            <div
              onClick={() => setAwardOpen(true)}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
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
                className="flex items-start justify-between p-4 border rounded-lg bg-gray-50"
              >
                <span className="text-sm">{achievement.title}</span>
                <div>
                  <div className="relative w-24 h-12 border"></div>
                  <div className="flex items-center gap-2 py-1 cursor-pointer">
                  <p onClick={()=>setOpenEdit(true)} className="flex items-center gap-1 tex-xs">
                    {" "}
                    <Edit size="14" /> edit
                  </p>
                  <p className="flex items-center text-xs">
                    <MdDelete size={"14"} /> delete
                  </p>
                </div>
                </div>
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
        <AddAchievements
          awardOpen={awardOpen}
          onOpenChange={setAwardOpen}
          onSave={() => {}}
        />
        <EditAward openEdit={openEdit} setOpenEdit={setOpenEdit}/>
      </DialogContent>
    </Dialog>
  );
}
