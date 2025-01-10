"use client";

import { Eye, EyeOff, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddLicenseProps {
  licenseOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddLicense({
  licenseOpen,
  onOpenChange,
}: AddLicenseProps) {
  return (
    <Dialog open={licenseOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Add License</DialogTitle>
          </div>
        </DialogHeader>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="licenseOf">
                License of<span className="text-red-500">*</span>
              </Label>
              <Input id="licenseOf" placeholder="Ex: Hair Dresser" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input id="licenseNumber" placeholder="Ex: 111" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuedBy">Issued By</Label>
              <Input id="issuedBy" placeholder="Institution" />
            </div>

            <div className="space-y-2">
              <Label>License</Label>
              <div className="border-2 border-dashed rounded-lg p-6">
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
                    Drag your image here or click to upload
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="license-upload"
                />
              </div>

              <div className="flex justify-end">
                <div className="flex items-center gap-2 text-[10px] cursor-pointer text-muted-foreground">
                  <div className="flex items-center gap-1 ">
                    <EyeOff size={12} />
                    <p>hide image</p>
                    <div className="relative group">
                      <Info size={12} className="cursor-pointer" />
                      <div className="hidden group-hover:block absolute -top-16 right-1 w-[300px] h-[44px] bg-[#565656] text-white p-2 rounded">
                        <p>
                          The certificate won&apos;t be publicly displayed on your
                          profile. It will be used for internal verification
                          purposes. You can adjust these settings later.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    show image
                    <div className="relative group">
                      <Info size={12} className="cursor-pointer" />
                      <div className="hidden group-hover:block absolute -top-16 right-1 w-[300px] h-[44px] bg-[#565656] text-white p-2 rounded">
                        <p>
                          It&apos;s best. Your credentials will be publicly visible,
                          helping customers trust your expertise and choose you
                          with confidence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <div>
              <p className="text-[12px] text-muted-foreground">
                You can add multiple license later from &apos;Edit Profile&apos;.
              </p>
            </div>
            <div>
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
