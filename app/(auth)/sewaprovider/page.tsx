"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";

// Define Form Data Interface
interface SewaProviderDetailsFormData {
  province: string;
  district: string;
  municipality: string;
  wardNo: string;
  tole: string;
  gender: string;
  dateOfBirth: string;
}

export default function SewaProviderDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SewaProviderDetailsFormData>();

  // Handle Form Submission
  const onSubmit = (data: SewaProviderDetailsFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-poppins">
      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src="/images/mainLogo.svg" alt="logo" width={50} height={50} />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl text-black mb-6 font-poppins">
          Sewa Provider Details
        </h2>

        {/* Individual Tab */}
        <div className="text-center text-sm text-[#878787] mb-4">
          <p>Individual</p>
          <div
            className="w-full h-[2px]"
            style={{ backgroundColor: "#2E3192", marginTop: "8px" }}
          ></div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-[#878787]"
        >
          {/* Province and District */}
          <div className="flex space-x-2">
            <select
              {...register("province", { required: "Province is required" })}
              className="w-1/2 border rounded-md p-2 focus:ring-[#2E3192]"
            >
              <option value="">Province</option>
              <option value="Province 1">Province 1</option>
              <option value="Province 2">Province 2</option>
            </select>
            {errors.province && (
              <span className="text-red-500 text-sm">
                {errors.province.message}
              </span>
            )}

            <select
              {...register("district", { required: "District is required" })}
              className="w-1/2 border rounded-md p-2 focus:ring-[#2E3192]"
            >
              <option value="">District</option>
              <option value="District 1">District 1</option>
              <option value="District 2">District 2</option>
            </select>
            {errors.district && (
              <span className="text-red-500 text-sm">
                {errors.district.message}
              </span>
            )}
          </div>

          {/* Municipality and Ward No */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Municipality"
              {...register("municipality", {
                required: "Municipality is required",
              })}
              className="w-1/2 border rounded-md p-2 focus:ring-[#2E3192] placeholder-[#878787]"
            />
            <input
              type="text"
              placeholder="Ward No."
              {...register("wardNo", { required: "Ward No. is required" })}
              className="w-1/2 border rounded-md p-2 focus:ring-[#2E3192] placeholder-[#878787]"
            />
          </div>
          {errors.municipality && (
            <span className="text-red-500 text-sm">
              {errors.municipality.message}
            </span>
          )}
          {errors.wardNo && (
            <span className="text-red-500 text-sm">
              {errors.wardNo.message}
            </span>
          )}

          {/* Tole */}
          <input
            type="text"
            placeholder="Tole"
            {...register("tole", { required: "Tole is required" })}
            className="w-full border rounded-md p-2 focus:ring-[#2E3192] placeholder-[#878787]"
          />
          {errors.tole && (
            <span className="text-red-500 text-sm">{errors.tole.message}</span>
          )}

          {/* Gender and Date of Birth */}
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-sm text-[#878787] mb-1">
                Gender
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full border rounded-md p-2 focus:ring-[#2E3192]"
              >
                <option value="">Select a gender</option>
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

            <div className="w-1/2">
              <label className="block text-sm text-[#878787] mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
                className="w-full border rounded-md p-2 focus:ring-[#2E3192]"
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-sm">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
          </div>

          {/* Proceed Button */}
          <Button variant={"brand"} className="mt-2 w-full">
            Proceed
          </Button>
        </form>
      </div>
    </div>
  );
}
