"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddAchievementsProps {
  awardOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddAchievements({
  awardOpen,
  onOpenChange,
}: AddAchievementsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCertificateClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  return (
    <Dialog open={awardOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Add Awards & Achievements
            </DialogTitle>
          </div>
        </DialogHeader>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title<span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Ex: Hair Styling Competition"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Award Year</Label>
              <Input id="year" placeholder="Ex: 2024" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from">Award From</Label>
              <Input id="from" placeholder="Institution name" />
            </div>

            <div className="space-y-2">
              <Label>Certificate</Label>
              <div
                className="border-2 border-dashed rounded-lg p-6 cursor-pointer"
                onClick={handleCertificateClick} // Attach the click handler to the div
              >
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-sm text-muted-foreground text-center">
                    Drag your certificate image here or click to upload
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    Acceptable file types: jpg, png, jpeg
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef} // Attach ref to the input
                  className="hidden"
                  accept="image/jpeg,image/png"
                  id="certificate-upload"
                />
              </div>
              
            </div>
            
          </div>

          <div className="flex justify-between items-center gap-3">
          <p className="text-[12px] text-muted-foreground">
          You can add multiple Achievements later from &apos;Edit Profile&apos;.

              </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="gradient-text"
            >
              Cancel
            </Button>
            <Button type="submit" variant="brand">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
