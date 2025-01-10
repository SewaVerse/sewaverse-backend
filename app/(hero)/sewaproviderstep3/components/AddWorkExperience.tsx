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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AddWorkExperienceProps {
  modalOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddWorkExperience({
  modalOpen,
  onOpenChange,
}: AddWorkExperienceProps) {
  return (
    <Dialog open={modalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Add Work Experience
            </DialogTitle>
          </div>
        </DialogHeader>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title<span className="text-red-500">*</span>
              </Label>
              <Input id="title" placeholder="Ex: Hair Dresser" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" placeholder="Ex: Hair Dresser" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="years">
                  Experience years<span className="text-red-500">*</span>
                </Label>
                <Select>
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
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select the category for" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hairdressing">Hairdressing</SelectItem>
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
                placeholder="Provide Short Description of works"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2 relative">
              <Label>Work Certificate</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
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
                  <div className="text-sm text-muted-foreground">
                    Drag your image here or click to browse
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="certificate-upload"
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
                            The certificate won't be publicly displayed on your
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
                            It's best. Your credentials will be publicly
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
                You can add multiple experiences later from 'Edit Profile'.
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
