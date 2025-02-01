"use client";

import { CirclePlus, Edit } from "lucide-react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

import AddYourWorks from "@/app/(hero)/(private)/sewa-provider/verification/step-3/components/AddYourWorks";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import EditPreviousWorks from "./EditWorks";


interface works {
  id: string;
  title: string;
  description: string;
}

interface AddMoreWorksProps {
  open: boolean;
  works: works[];
  onOpenChange: (open: boolean) => void;
}

export default function AddMoreWorks({
  open,
  onOpenChange,
  works,
}: AddMoreWorksProps) {
 const [worksOpen, setWorksOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              My Works
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Existing Licenses */}
          {works.map((work) => (
            <div
              key={work.id}
              className="flex  items-start justify-between p-4 bg-gray-50 rounded-lg border"
            >
              <div>
                <h3 className="font-medium">{work.title}</h3>
                <p className="text-sm text-gray-500">{work.description}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-[100px] h-[50px] border bg-[#D9D9D9]"></div>
                <div className="flex items-center gap-2 cursor-pointer py-1">
                  <p onClick={()=>setOpenEdit(true)} className="tex-xs flex items-center gap-1">
                    {" "}
                    <Edit size="14" /> edit
                  </p>
                  <p className="text-xs flex items-center">
                    <MdDelete size={"14"} /> delete
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Add License Form */}

          <div
            onClick={() => setWorksOpen(true)}
            className=" cursor-pointer flex items-center justify-center gap-2 text-sm text-muted-foreground outline-dashed p-1"
          >
            <span className="text-green-500">
              <CirclePlus />
            </span>
            Add Work
          </div>
        </div>

        <Button
          variant={"brand"}
          className="w-full"
          onClick={() => onOpenChange(false)}
        >
          Done
        </Button>
      </DialogContent>
     <AddYourWorks worksOpen={worksOpen} onOpenChange={setWorksOpen} onSave={()=>{}}/>
     <EditPreviousWorks openEdit={openEdit} setOpenEdit={setOpenEdit} />
    </Dialog>
  );
}
