"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import FileUpload from "@/components/form/FileUpload";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Select from "@/components/form/Select";
import Input from "@/components/form/Input";

interface Province {
  value: string;
  label: string;
}


// Define Form Data Interface
interface SewaProviderDetailsFormData {
  gender: string;
  dateOfBirth: string;
  province: string;
  district: string;
  municipality: string;
  wardNo: string;
  tole: string;
  citizenshipFront: string;
  citizenshipBack: File;
  panNumber: string;
  panCardImage: File;
  citizenship: string;
  name: string;
  front: string;
}

export default function SewaProviderDetails() {

  const [provinceOptions, setProvinceOptions] = useState<Province[]>([]);

  // Fetch Province Data
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://api.example.com/provinces"); 
        const data = await response.json();
        const formattedProvinces = data.map((province: any) => ({
          value: province.id,
          label: province.name,
        }));
        setProvinceOptions(formattedProvinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);
  const form = useForm<SewaProviderDetailsFormData>({
    defaultValues: {
      name: "",
      citizenshipFront: "",
      gender: "",
    },
  });

  // Handle Form Submission
  const onSubmit = (data: SewaProviderDetailsFormData) => {
    console.error("Form Data:", data);
  };

  return (
    <Form {...form}>
      <div className="flex justify-between items-center min-h-screen gap-16 bg-gray-50 py-10 mx-16">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          {/* Logo */}
          {/* <div className="flex justify-center mb-4">
        <Image src="/images/mainLogo.svg" alt="logo" width={50} height={50} />
      </div> */}

          {/* Title */}
          <h2 className="text-center text-2xl text-black mb-6">
            Sewa Provider Details
          </h2>

          {/* Individual Tab */}
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <p>Individual</p>
            <p>Step 1/3</p>
          </div>
          <div className="w-full h-[2px] bg-[#2E3192] mb-4"></div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Gender and Date of Birth Section */}
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="relative">
                <label
                  className="block mb-2 text-sm font-medium"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <Select
                  className=" border rounded-xl"
                  form={form}
                  name="gender"
                  placeholder="Select gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>

              <div className="relative">
                <label
                  className="block mb-2 text-sm font-medium"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  className="block w-full py-2  border border-gray-200 rounded-xl px-3"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-[50px]">
              <label className="block mb-2 text-md font-sm">Address</label>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <Select
                  className="rounded-xl"
                  form={form}
                  name="province"
                  placeholder="Select Province"
                  options={provinceOptions}
                />
                <select className="w-full border border-gray-200 rounded-xl px-3 ">
                  <option value="">District</option>
                  <option value="District 1">District 1</option>
                  <option value="District 2">District 2</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <select className="w-full border border-gray-200 rounded-xl px-3">
                  <option value="">Municipality</option>
                  <option value="Municipality 1">Municipality 1</option>
                  <option value="Municipality 2">Municipality 2</option>
                </select>
                <input
                  type="text"
                  placeholder="Ward No."
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 "
                />
              </div>
              <input
                type="text"
                placeholder="Tole"
                className="w-full border border-gray-200 rounded-xl px-3 py-2"
              />
            </div>

            {/* Verification Documents */}
            <div>
              <div className="flex flex-col">
                <label className="text-lg font-medium ">
                  Verification Documents
                </label>
                <label className="text-sm font-sm gradient-text ">
                  Personal Documents
                </label>
              </div>
              <div className="mb-4">
                {/* <label className="block text-sm font-medium text-gray-600 mb-2">
                Citizenship Type
              </label> */}
                <Select
                  className=" rounded-xl"
                  form={form}
                  name="citizenship"
                  placeholder="Select Citizenship"
                  options={[
                    { value: "Nepali", label: "Nepali" },
                    { value: "Foreign", label: "Foreign" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block  text-md text-gray-400 font-sm px-2">
                    Front Side
                  </label>
                   <FileUpload form={form} name="citizenshipFront" />
                </div>
                <div>
                  <label className="block  text-md text-gray-400 font-sm px-2">
                    Address
                  </label>
                  <FileUpload form={form} name="citizenshipFront" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-[-20px]">
              <div>
                <label className="block gradient-text  font-sm mt-[-15px] px-2">
                  PAN Card
                </label>
                <label className="block mb-1 text-black font-sm px-2">
                  PAN Number
                </label>
                <Input 
                type="text"
                placeholder="PAN Number"
                form={form}
                name="panNumber"
                disabled={form.formState.isSubmitting}
              />
              </div>
              <div>
                <label className="block text-md text-black font-sm px-2 mt-2">
                  PAN Card Image
                </label>
                <FileUpload form={form} name="panCard" />
              </div>
            </div>

            {/* Proceed Button */}
            <Button
              variant={"brand"}
              type="submit"
              className="w-full text-white py-3 rounded-[10px] shadow-md"
            >
              Proceed
            </Button>
          </form>
        </div>
        <div className="mx-auto w-dvw ">
          <label className="block mb-2 text-lg text-black font-sm text-center">
            Preview Of Document
          </label>
          {/* <div   className="border border-dotted border-gray-500 h-screen w-full" >&nbsp;<span className="text-center">image</span></div> */}
          <div className="border-[2px] border-dashed border-black h-80 w-full flex items-center justify-center">
            <span className="text-center">image</span>
          </div>
        </div>
      </div>
    </Form>
  );
}
