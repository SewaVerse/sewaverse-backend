"use client";

import { CirclePlus, Edit } from "lucide-react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

import EditLicense from "@/app/(hero)/profile/_components/License/EditLicense";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import AddLicense from "./AddLicense";

interface license {
  id: string;
  title: string;
  institute: string;
}

interface LicenseFormProps {
  open: boolean;
  license: license[];
  onOpenChange: (open: boolean) => void;
}

export default function AddMoreLicense({
  open,
  onOpenChange,
  license,
}: LicenseFormProps) {
  const [licenseOpen, setLicenseOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Licenses
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Existing Licenses */}
          {license.map((license) => (
            <div
              key={license.id}
              className="flex  items-start justify-between p-4 bg-gray-50 rounded-lg border"
            >
              <div>
                <h3 className="font-medium">{license.title}</h3>
                <p className="text-sm text-gray-500">{license.institute}</p>
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
            onClick={() => setLicenseOpen(true)}
            className=" cursor-pointer flex items-center justify-center gap-2 text-sm text-muted-foreground outline-dashed p-1"
          >
            <span className="text-green-500">
              <CirclePlus />
            </span>
            Add License
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
      <AddLicense licenseOpen={licenseOpen} onOpenChange={setLicenseOpen} />
      <EditLicense openEdit={openEdit} setOpenEdit={setOpenEdit} onSave={(data) => {
          console.warn("Saved license data:", data)
        }}/>
    </Dialog>
  );
}
