"use client";

import { Edit, Upload } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProfileData } from "@/lib/types";

interface ProfileFormProps {
  data: ProfileData;
  onUpdate: (data: Partial<ProfileData>) => void;
}

export function ProfileForm({ data, onUpdate }: ProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-between gap-4">
      <Card className="mt-6 w-full">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 border rounded-lg p-4">
            <div className="relative w-16 h-16">
              {data.profileImage ? (
                <Image
                  src={data.profileImage}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200" />
              )}
            </div>
            <div>
              <p className="font-medium">Profile picture</p>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Change
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center border rounded-lg p-4">
              <div>
                <p className="text-gray-600">Profession</p>
                <p className="gradient-text">{data.profession}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-between items-center border rounded-lg p-4">
              <div>
                <p className="text-gray-600">Experience</p>
                <p className="gradient-text">{data.experience}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-between items-center border rounded-lg p-4">
              <div>
                <p className="text-gray-600">Offered Services</p>
                <p className="gradient-text">
                  {data.offeredServices.join(", ")}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-between items-center border rounded-lg p-4">
              <div>
                <p className="text-gray-600">Core Skills</p>
                <p className="gradient-text">{data.coreSkills.join(", ")}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-between items-center border rounded-lg p-4">
              <div>
                <p className="text-gray-600">Location of Service</p>
                <p className="gradient-text">{data.location.join(", ")}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button className="w-full bg-brand-gradient">Next</Button>
        </div>
      </Card>
      <Card className="mt-6 w-full flex items-center justify-center">
        <div className="">
          <div className="relative w-60 h-60">
            {data.profileImage ? (
              <Image
                src={data.profileImage}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200" />
            )}
          </div>
        </div>
      </Card>
      {/* <Profession /> */}
    </div>
  );
}
