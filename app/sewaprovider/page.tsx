"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

// Define Form Data Interface
interface SewaProviderDetailsFormData {
  gender: string;
  dateOfBirth: string;
  province: string;
  district: string;
  municipality: string;
  wardNo: string;
  tole: string;
  citizenshipFront: FileList;
  citizenshipBack: FileList;
  panNumber: string;
  panCardImage: FileList;
  citizenship: string;
}

export default function SewaProviderDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SewaProviderDetailsFormData>();

  // Handle Form Submission
  const onSubmit = (data: SewaProviderDetailsFormData) => {
    console.error("Form Data:", data);
  };

  return (
    <div className="flex justify-start items-center min-h-screen bg-gray-50 p-10">
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
        <p>Step 1</p>
      </div>
      <div className="w-full h-[2px] bg-[#2E3192] mb-4"></div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Gender and Date of Birth Section */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="relative">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              {...register("gender", { required: "Gender is required" })}
              className="block w-full h-[45px] border border-gray-300 rounded-[20px] px-3 appearance-none"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {errors.gender && (
              <span className="text-red-500 text-sm">
                {errors.gender.message}
              </span>
            )}
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
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
              className="block w-full h-[45px] border rounded-[100px] px-3"
            />
            {errors.dateOfBirth && (
              <span className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Address</h3>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <select
              {...register("province", { required: "Province is required" })}
              className="w-full border border-gray-300 rounded-[20px] p-3 shadow-sm"
            >
              <option value="">Province</option>
              <option value="Province 1">Province 1</option>
              <option value="Province 2">Province 2</option>
            </select>
            <select
              {...register("district", { required: "District is required" })}
              className="w-full border border-gray-300 rounded-[20px] p-3 shadow-sm"
            >
              <option value="">District</option>
              <option value="District 1">District 1</option>
              <option value="District 2">District 2</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <select
              {...register("district", {
                required: "Municipality is required",
              })}
              className="w-full border border-gray-300 rounded-[20px] p-3 shadow-sm"
            >
              <option value="">Municipality</option>
              <option value="Municipality 1">Municipality 1</option>
              <option value="Municipality 2">Municipality 2</option>
            </select>
            <input
              type="text"
              placeholder="Ward No."
              {...register("wardNo", { required: "Ward No. is required" })}
              className="w-full border border-gray-300 rounded-[20px] p-3 shadow-sm"
            />
          </div>
          <input
            type="text"
            placeholder="Tole"
            {...register("tole", { required: "Tole is required" })}
            className="w-full border border-gray-300 rounded-[20px] p-3 shadow-sm"
          />
        </div>

        {/* Verification Documents */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Verification Documents
          </h3>
          <h5 className="text-lg font-medium text-gray-800 mb-4">
            Personal Documents
          </h5>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Citizenship Type
            </label>
            <select
              {...register("citizenship", {
                required: "Citizenship type is required",
              })}
              className="w-full border border-gray-300 rounded-[20px] p-3 shadow-sm"
            >
              <option value="">Select Citizenship</option>
              <option value="Nepali">Nepali</option>
              <option value="Foreign">Foreign</option>
            </select>
            {errors.citizenship && (
              <span className="text-red-500 text-sm">
                {errors.citizenship.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <input
              type="file"
              {...register("citizenshipFront", {
                required: "Citizenship front side is required",
              })}
              className="w-full text-sm text-gray-500"
            />
            <input
              type="file"
              {...register("citizenshipBack", {
                required: "Citizenship back side is required",
              })}
              className="w-full text-sm text-gray-500"
            />
          </div>
        </div>

        {/* PAN Card */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">PAN Card</h3>
          <input
            type="text"
            placeholder="PAN Number"
            {...register("panNumber", { required: "PAN Number is required" })}
            className="w-full border border-gray-300 rounded-[20px] p-3 shadow-sm"
          />
          <input
            type="file"
            {...register("panCardImage", {
              required: "PAN Card image is required",
            })}
            className="w-full text-sm text-gray-500"
          />
        </div>

        {/* Proceed Button */}
        <Button
          variant={"brand"}
          type="submit"
          className="w-full text-white py-3 rounded-[20px] shadow-md"
        >
          Proceed
        </Button>
      </form>
    </div>
  </div>
  );
}
