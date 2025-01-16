"use client";

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

interface Award {
  id: number;
  title: string;
  year: string;
  from: string;
  certificateUrl?: string;
}

interface AddAchievementsProps {
  awardOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (award: Award) => void;
}

export default function AddAchievements({
  awardOpen,
  onOpenChange,
  onSave,
}: AddAchievementsProps) {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    from: "",
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAward: Award = {
      id: Date.now(),
      ...formData,
      certificateUrl: certificateFile
        ? URL.createObjectURL(certificateFile)
        : undefined,
    };
    onSave(newAward);
    onOpenChange(false);
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title<span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Ex: Hair Styling Competition"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Award Year</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                placeholder="Ex: 2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from">Award From</Label>
              <Input
                id="from"
                value={formData.from}
                onChange={(e) =>
                  setFormData({ ...formData, from: e.target.value })
                }
                placeholder="Institution name"
              />
            </div>

            <div className="space-y-2">
              <Label>Certificate</Label>

              <FileUpload
                accept="image/*"
                maxSize={1024 * 1024 * 5} // 5MB
                onFileSelect={(file) => setCertificateFile(file)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-3">
            <p className="text-[12px] text-muted-foreground">
              You can add multiple Achievements later from &apos;Edit
              Profile&apos;.
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
