"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

interface MyProfileProps {
  openEditProfile: boolean;
  setOpenEditProfile: (open: boolean) => void;
}

interface ProfileForm {
  fullName: string;
  dateOfBirth: {
    year: string;
    month: string;
    day: string;
  };
  gender: string;
  phoneNo: string;
  email: string;
  address: {
    province: string;
    district: string;
    municipality: string;
    wardNo: string;
    tole: string;
  };
}
// for active heading

// for image
const profile1: string = "/images/servicesImage/profile1.svg";

const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);
const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "22"];
const days = Array.from({ length: 31 }, (_, i) => i + 1);

export default function EditUserPRofile({
  openEditProfile,
  setOpenEditProfile,
}: MyProfileProps) {
  const [profileImage, setProfileImage] = React.useState<string>(
    "/placeholder.svg?height=100&width=100"
  );
  const [formData, setFormData] = React.useState<ProfileForm>({
    fullName: "",
    dateOfBirth: {
      year: "",
      month: "",
      day: "",
    },
    gender: "",
    phoneNo: "",
    email: "",
    address: {
      province: "",
      district: "",
      municipality: "",
      wardNo: "",
      tole: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    subfield?: string
  ) => {
    if (subfield) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev,
          [subfield]: e.target.value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setOpenEditProfile(false);
  };

  return (
    <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
      <DialogContent className="h-auto md:max-h-[900px]  ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold gradient-text mt-3 text-center">
            My Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-24 w-24 relative ">
              <AvatarImage src={profileImage} alt="Profile" />
              <Image src={profile1} alt="profile1" height={100} width={100} />
            </Avatar>
            <div className="absolute top-[9rem] left-80 bg-white border rounded-full p-1">
              <Camera className="h-4 w-4 " />
            </div>
            <div className="relative">
              <input
                type="file"
                id="profilePicture"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="profilePicture"
                className="flex items-center gap-2 text-sm  cursor-pointer underline"
              >
                Change profile picture
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <Label htmlFor="fullName">
                Full Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange(e, "fullName")}
                placeholder="Rohan Shrestha"
                required
              />
            </div>

            <div>
              <Label>Date of Birth</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select
                  value={formData.dateOfBirth.year}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfBirth: { ...prev.dateOfBirth, year: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={formData.dateOfBirth.month}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfBirth: { ...prev.dateOfBirth, month: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={formData.dateOfBirth.day}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfBirth: { ...prev.dateOfBirth, day: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Male" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phoneNo">
                Phone No.<span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNo"
                value={formData.phoneNo}
                onChange={(e) => handleInputChange(e, "phoneNo")}
                placeholder="9800000000"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">
                E-mail<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e, "email")}
                placeholder="rohan123@gmail.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Select
                    value={formData.address.province}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, province: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="province1">Province 1</SelectItem>
                      <SelectItem value="province2">Province 2</SelectItem>
                      <SelectItem value="province3">Province 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={formData.address.district}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, district: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="district1">District 1</SelectItem>
                      <SelectItem value="district2">District 2</SelectItem>
                      <SelectItem value="district3">District 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={formData.address.municipality}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, municipality: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="municipality1">
                        Municipality 1
                      </SelectItem>
                      <SelectItem value="municipality2">
                        Municipality 2
                      </SelectItem>
                      <SelectItem value="municipality3">
                        Municipality 3
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={formData.address.wardNo}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, wardNo: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ward No." />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 32 }, (_, i) => i + 1).map(
                        (ward) => (
                          <SelectItem key={ward} value={ward.toString()}>
                            {ward}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Input
                placeholder="Tole"
                value={formData.address.tole}
                onChange={(e) => handleInputChange(e, "address", "tole")}
              />
            </div>
          </div>

          <div className="flex justify-center  mt-3 mb-4">
            <Button type="submit" variant={"brand"} className="w-[192px]">
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
