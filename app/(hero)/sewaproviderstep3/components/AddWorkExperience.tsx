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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { FileUpload } from "../components/ui/file-upload";

interface WorkExperience {
  id: number;
  title: string;
  company: string;
  years: string;
  category: string;
  description: string;
  certificateUrl?: string;
}

interface AddWorkExperienceProps {
  modalOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (experience: WorkExperience) => void;
}

export default function AddWorkExperience({
  modalOpen,
  onOpenChange,
  onSave,
}: AddWorkExperienceProps) {
  const [formData, setFormData] = useState<Partial<WorkExperience>>({});
  // const [showCertificate, setShowCertificate] = useState(true);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setCertificateFile(file);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExperience: WorkExperience = {
      id: Date.now(),
      title: formData.title || "",
      company: formData.company || "",
      years: formData.years || "",
      category: formData.category || "",
      description: formData.description || "",
      certificateUrl: certificateFile
        ? URL.createObjectURL(certificateFile)
        : undefined,
    };
    onSave(newExperience);
    onOpenChange(false);
    setFormData({});
    setCertificateFile(null);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Work Experience
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title<span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                placeholder="Ex: Hair Dresser"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={formData.company || ""}
                onChange={handleInputChange}
                placeholder="Ex: Style Studio"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="years">
                  Experience years<span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange(value, "years")}
                >
                  <SelectTrigger id="years">
                    <SelectValue placeholder="Select the years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="2">2 years</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="4">4 years</SelectItem>
                    <SelectItem value="5">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Category<span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "category")
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select the category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hairdressing">Hair Dressing</SelectItem>
                    <SelectItem value="styling">Styling</SelectItem>
                    <SelectItem value="coloring">Coloring</SelectItem>
                    <SelectItem value="cutting">Cutting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Provide Short Description of works"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2 relative">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Work Certificate</h3>
                <FileUpload
                  accept="image/*"
                  maxSize={1024 * 1024 * 5} // 5MB
                  onFileSelect={(file) => setCertificateFile(file)}
                />
              </div>

              <div>
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
          </div>

          <div className="flex justify-between items-center gap-3">
            <div>
              <p className="text-[12px] text-muted-foreground">
                You can add multiple experiences later from &apos;Edit
                Profile&apos;.
              </p>
            </div>
            <div className="flex gap-3">
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
