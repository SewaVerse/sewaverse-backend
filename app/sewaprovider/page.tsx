"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileUploader, FileUploaderContent, FileUploaderItem } from "@/components/ui/file-upload";
import { FileInput, CloudUpload, Paperclip } from "lucide-react";
import { useState } from "react";

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
  name: string;
  front:string;
}

export default function SewaProviderDetails() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SewaProviderDetailsFormData>();

  const form = useForm<SewaProviderDetailsFormData>({
    defaultValues: {
      name: ""
    },
  });
  
  const [files, setFiles] = useState < File[] | null > (null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

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
                className="block w-full py-2  border border-gray-200 rounded-xl px-3 appearance-none"
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
                className="block w-full py-2  border border-gray-200 rounded-xl px-3"
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
            <label className="block mb-2 text-md font-medium">Address</label>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <select
                {...register("province", { required: "Province is required" })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2"
              >
                <option value="">Province</option>
                <option value="Province 1">Province 1</option>
                <option value="Province 2">Province 2</option>
              </select>
              <select
                {...register("district", { required: "District is required" })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2"
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
                className="w-full border border-gray-200 rounded-xl px-3 py-2"
              >
                <option value="">Municipality</option>
                <option value="Municipality 1">Municipality 1</option>
                <option value="Municipality 2">Municipality 2</option>
              </select>
              <input
                type="text"
                placeholder="Ward No."
                {...register("wardNo", { required: "Ward No. is required" })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 "
              />
            </div>
            <input
              type="text"
              placeholder="Tole"
              {...register("tole", { required: "Tole is required" })}
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
            />
          </div>

          {/* Verification Documents */}
          <div>
        <div className="flex flex-col mb-4">
        <label className="text-lg font-medium ">
              Verification Documents
            </label>
            <label className="text-sm font-medium ">
              Personal Documents
            </label>
        </div>
            <div className="mb-4">
              {/* <label className="block text-sm font-medium text-gray-600 mb-2">
                Citizenship Type
              </label> */}
              <select
                {...register("citizenship", {
                  required: "Citizenship type is required",
                })}
                className="w-full border border-1 border-gray-600 rounded-xl p-3 "
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
            <div>
              <label className="block mb-1 text-md text-gray-400 font-medium">Front Side</label>
              {/* <input type="text" className=" w-full border border-dotted p-3 text-gray-500" placeholder="Drag your image here or click to upload" /> */}
              <FormField
              control={control}
              name="front"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select File</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                          <CloudUpload className='text-gray-500 w-10 h-10' />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>Select a file to upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
              <div>
              <label className="block mb-1 text-md text-gray-400 font-medium">Address</label>
              <input type="text" className="border w-full border-dotted p-3 text-gray-500" placeholder="Drag your image here or click to upload" />

              </div>
              
              {/* <input
                type="file"
                {...register("citizenshipFront", {
                  required: "Citizenship front side is required",
                })}
                className="w-full text-sm text-gray-500"
              /> */}
              {/* <input
                type="file"
                {...register("citizenshipBack", {
                  required: "Citizenship back side is required",
                })}
                className="w-full text-sm text-gray-500"
              /> */}
            </div>
          </div>

          {/* PAN Card */}
          {/* <div>
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
          </div> */}
<label className="block mb-2 text-lg text-gray-600 font-medium">Pan</label>
<div className="grid grid-cols-2 gap-6">


            <div>
              <label className="block mb-1 text-md text-gray-400 font-medium">Pan Number</label>
              <input type="text" className="border w-full  p-3 text-gray-500" placeholder="Drag your image here or click to upload" />

              </div>
              <div>
              <label className="block mb-1 text-md text-gray-400 font-medium">Pan Card Image</label>
              <input type="text" className="border w-full border-dotted p-3 text-gray-500" placeholder="Drag your image here or click to upload" />

              </div>
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
      <div className="mx-auto w-dvw ">
      <label className="block mb-2 text-lg text-gray-600 font-medium text-center">Preview Of Document</label>
        {/* <div   className="border border-dotted border-gray-500 h-screen w-full" >&nbsp;<span className="text-center">image</span></div> */}
        <div className="border border-dotted border-gray-500 h-80 w-full flex items-center justify-center">
  <span className="text-center">image</span>
</div>   
      </div>
    </div>
    </Form>
  );
}