"use client";

import { Eye, EyeOff, Info } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FileUpload } from "./ui/file-upload";

interface License {
  id: number;
  licenseOf: string;
  licenseNumber: string;
  issuedBy: string;
  certificateUrl?: string;
}

interface AddLicenseProps {
  licenseOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (license: License) => void;
}

export default function AddLicense({
  licenseOpen,
  onOpenChange,
  onSave,
}: AddLicenseProps) {
  const [formData, setFormData] = useState({
    licenseOf: "",
    licenseNumber: "",
    issuedBy: "",
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLicense: License = {
      id: Date.now(),
      ...formData,
      certificateUrl: certificateFile
        ? URL.createObjectURL(certificateFile)
        : undefined,
    };
    onSave(newLicense);
    onOpenChange(false);
  };

  return (
    <Dialog open={licenseOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Add License</DialogTitle>
          </div>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="licenseOf">
                License of<span className="text-red-500">*</span>
              </Label>
              <Input
                id="licenseOf"
                value={formData.licenseOf}
                onChange={(e) =>
                  setFormData({ ...formData, licenseOf: e.target.value })
                }
                placeholder="Ex: Hair Dresser"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) =>
                  setFormData({ ...formData, licenseNumber: e.target.value })
                }
                placeholder="Ex: 111"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuedBy">Issued By</Label>
              <Input
                id="issuedBy"
                value={formData.issuedBy}
                onChange={(e) =>
                  setFormData({ ...formData, issuedBy: e.target.value })
                }
                placeholder="Institution"
              />
            </div>

            <div className="space-y-2">
              <Label>License</Label>

              <FileUpload
                accept="image/*"
                maxSize={1024 * 1024 * 5} // 5MB
                onFileSelect={(file) => setCertificateFile(file)}
              />

              <div className="flex justify-end">
                <div className="flex items-center gap-2 text-[10px] cursor-pointer text-muted-foreground">
                  <div className="flex items-center gap-1 ">
                    <EyeOff size={12} />
                    <p>hide image</p>
                    <div className="relative group">
                      <Info size={12} className="cursor-pointer" />
                      <div className="hidden group-hover:block absolute -top-16 right-1 w-[300px] h-[44px] bg-[#565656] text-white p-2 rounded">
                        <p>
                          The certificate won&apos;t be publicly displayed on
                          your profile. It will be used for internal
                          verification purposes. You can adjust these settings
                          later.
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
                          It&apos;s best. Your credentials will be publicly
                          visible, helping customers trust your expertise and
                          choose you with confidence.
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
                You can add multiple license later from &apos;Edit
                Profile&apos;.
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
