"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  dateOfBirth: z.object({
    year: z.string().min(1, { message: "Year is required" }),
    month: z.string().min(1, { message: "Month is required" }),
    day: z.string().min(1, { message: "Day is required" }),
  }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  phoneNo: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.object({
    province: z.string().min(1, { message: "Province is required" }),
    district: z.string().min(1, { message: "District is required" }),
    municipality: z.string().min(1, { message: "Municipality is required" }),
    wardNo: z.string().min(1, { message: "Ward No. is required" }),
    tole: z.string(),
  }),
});

const profile1: string = "/images/servicesImage/profile1.svg";

export default function EditUserProfile() {
  const [profileImage, setProfileImage] = React.useState<string>(
    "/placeholder.svg?height=100&width=100"
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.warn(values);
    // Here you would typically send the data to your backend
    // After successful submission, you might want to close the dialog
    // This can be done by the parent component
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[12px] md:space-y-2"
      >
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-24 w-22 relative">
            <AvatarImage
              src={
                profileImage !== "/placeholder.svg?height=100&width=100"
                  ? profileImage
                  : profile1
              }
              alt="Profile"
            />
          </Avatar>
          <div className="absolute top-[9rem] md:left-80 left-60 bg-white border rounded-full p-1">
            <Camera className="h-4 w-4" />
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
              className="flex items-center gap-2 text-sm cursor-pointer underline"
            >
              Change profile picture
            </label>
          </div>
        </div>

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Full Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Rohan Shrestha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender field */}
        {/* <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Gender</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Phone Number field */}
        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Phone No.<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="9800000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                E-mail<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="rohan123@gmail.com"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address fields */}
        <div className="space-y-2">
          <FormLabel>Address</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            {/* Province, District, Municipality, Ward No. Select fields */}
            {/* ... (keep the existing code for these fields) ... */}
          </div>
          {/* Tole Input field */}
          <FormField
            control={form.control}
            name="address.tole"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Tole" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center md:mt-3 py-2 md:mb-4">
          <Button type="submit" variant={"brand"} className="w-full">
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
}
