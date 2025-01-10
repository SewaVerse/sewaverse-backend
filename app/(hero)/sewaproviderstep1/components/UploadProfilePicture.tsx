"use client";

import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface UploadProfilePictureProps {
  openUploadProfile: boolean;
  setOpenUploadProfile: (open: boolean) => void;
}

export default function UploadProfilePicture({
  openUploadProfile,
  setOpenUploadProfile,
}: UploadProfilePictureProps) {
  return (
    <Dialog open={openUploadProfile} onOpenChange={setOpenUploadProfile}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
          <form action="#">
        <div className="text-center space-y-4 py-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              Upload your profile picture: Create your Identity
            </h2>
            <p className="text-base text-muted-foreground">
              Convey Professionalism and Approachability. Let people know you.
            </p>
          </div>

          <div className="border-2 border-dashed rounded-lg p-12">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <div className="text-sm text-center text-muted-foreground">
                Drag your Picture here or click to upload
              </div>
              <div className="text-xs text-center text-muted-foreground">
                Acceptable file types: jpg, png, jpeg
              </div>
            </div>
          </div>

          <Button type="button" variant={"brand"} >Done</Button>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
