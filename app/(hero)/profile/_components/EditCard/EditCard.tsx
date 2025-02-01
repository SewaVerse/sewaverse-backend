"use client";

import { Camera, DeleteIcon, Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EditExperience from "./EditExperience";
import EditLocation from "./EditLocation";
import EditOfferServices from "./EditOfferServices";
import EditProfession from "./EditProfession";
import EditSkills from "./EditSkills";

interface ProfileSetupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditCard({
  open,
  onOpenChange,
}: ProfileSetupFormProps) {
  const imageDemo: string = "/images/servicesImage/Mechanics.svg";
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  // state for open EditProfession..

  const [activeEditBar, setActiveEditBar] = useState<string>("image");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] h-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-12 p-3 border md:grid-cols-2">
          <form className="">
            {/* profile image */}
            <div className="w-full mt-5 border rounded-md outline-none">
              <div className="relative flex items-center justify-between h-24 gap-1 px-2">
                <div>
                  <p className="text-sm">Profile Picture</p>
                  <Image
                    src={selectedImage || imageDemo}
                    alt="image"
                    height={10}
                    width={10}
                    className="w-16 h-16 border rounded-full shadow-md"
                  />
                </div>
                <div
                  className="flex items-center gap-1 text-sm cursor-pointer"
                  onClick={() => setActiveEditBar("image")}
                >
                  <Camera size={"14"} />
                  <span>Change</span>
                </div>
              </div>
            </div>

            {/* Profession */}
            <div className="w-full mt-5 border rounded-lg outline-none">
              <div className="relative flex items-center justify-between h-auto gap-1 px-2">
                <div>
                  <p className="text-sm">Profession</p>
                  <span className="text-sm gradient-text">Barber</span>
                </div>
                <div
                  className="flex items-center text-sm cursor-pointer"
                  onClick={() => setActiveEditBar("profession")}
                >
                  <Edit size={"14"} />
                  <span>Edit</span>
                </div>
              </div>
            </div>
            {/* Experience */}
            <div className="w-full mt-5 border rounded-lg">
              <div className="relative flex items-center justify-between h-auto gap-1 px-2">
                <div>
                  <p className="text-sm">Experience</p>
                  <span className="gradient-text">3 Years</span>
                </div>
                <div
                  onClick={() => setActiveEditBar("experience")}
                  className="flex items-center text-sm cursor-pointer"
                >
                  <Edit size={"14"} />
                  <span>Edit</span>
                </div>
              </div>
            </div>
            {/* Offered Services */}
            <div className="w-full mt-5 border rounded-lg">
              <div className="relative flex items-center justify-between h-auto gap-1 px-2">
                <div>
                  <p>Offer Services</p>
                  <span className="gradient-text">Hair Cutting</span>
                </div>
                <div
                  onClick={() => setActiveEditBar("service")}
                  className="flex items-center text-sm cursor-pointer"
                >
                  <Edit size={"12"} />
                  <span>Edit</span>
                </div>
              </div>
            </div>
            {/* Core Skills */}
            <div className="w-full mt-5 border rounded-lg">
              <div className="relative flex items-center justify-between h-auto gap-1 px-2">
                <div>
                  <p className="text-sm">Core Skills</p>
                  <p className="gradient-text">Hair Cutting</p>
                  <p className="gradient-text">Hair Coloring</p>
                  <p className="gradient-text">Hair Dressing</p>
                </div>
                <div
                  onClick={() => setActiveEditBar("skills")}
                  className="flex items-center text-sm cursor-pointer "
                >
                  <Edit size={"14"} />
                  <span>Edit</span>
                </div>
              </div>
            </div>
            {/* Location */}
            <div className="w-full mt-5 border rounded-lg">
              <div className="relative flex items-center justify-between h-auto gap-1 px-2">
                <div>
                  <p className="text-sm">Location of Service</p>
                  <span className="gradient-text">
                    Kathmandu, Lalitpur, Bhaktapur
                  </span>
                </div>
                <div
                  onClick={() => setActiveEditBar("location")}
                  className="flex items-center text-sm cursor-pointer"
                >
                  <Edit size={"14"} />
                  <span>Edit</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="submit" className="w-full" variant={"brand"}>
                Next
              </Button>
            </div>
          </form>

          {/* Image Section */}
          <div className="hidden my-20 md:block">
            {activeEditBar === "image" && (
              <div className="flex flex-col items-center gap-4 px-5 py-2 border">
                {/* Profile Picture Preview */}
                <div className="relative overflow-hidden border-4 rounded-full shadow-md w-60 h-60">
                  <Image
                    src={selectedImage || imageDemo}
                    alt="Profile Picture"
                    height={256}
                    width={256}
                    className="object-cover w-full h-full"
                  />
                </div>
                {selectedImage && (
                  <DeleteIcon
                    className="absolute w-6 h-6 right-32 top-52 "
                    onClick={handleImageDelete}
                  />
                )}

                {/* Upload Section */}
                <div className="w-full text-center ">
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <Button
                  variant="brand"
                  onClick={() =>
                    document.getElementById("banner-upload")?.click()
                  }
                  className="mb-2"
                >
                  Change Profile
                </Button>
              </div>
            )}
            {activeEditBar === "profession" && <EditProfession />}
            {activeEditBar === "experience" && <EditExperience />}
            {activeEditBar === "service" && <EditOfferServices />}
            {activeEditBar === "skills" && <EditSkills />}
            {activeEditBar === "location" && <EditLocation />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
