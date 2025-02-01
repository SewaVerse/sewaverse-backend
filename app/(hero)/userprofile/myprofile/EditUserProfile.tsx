"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { District, Municipality, StateProvince } from "@prisma/client";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { dobSchema } from "@/app/schemas/commonSchema";
import axios from "@/axios";
import Button from "@/components/form/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Use shadcn/ui Select component
import { getFallbackName } from "@/lib/utils";

import LocationForm from "./components/AddressForm";

interface EditUserProfileProps {
  initialData: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  // dob: z.string().min(1, { message: "Please select a date of birth" }),
  dob: dobSchema,
  gender: z.string().min(1, { message: "Please select a gender" }),
  phoneNo: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.object({
    provinceId: z.string().min(1, { message: "Province is required" }),
    districtId: z.string().min(1, { message: "District is required" }),
    municipalityId: z.string().min(1, { message: "Municipality is required" }),
    wardNo: z.number().min(1, { message: "Ward number is required" }),
    tole: z.string().min(1, { message: "Tole is required" }),
  }),
});

interface Option {
  value: string;
  label: string;
}

const fetchProvinces = async () => {
  try {
    const response = await fetch("/api/state-province");
    const data = await response.json();
    const formattedProvinces = data.data.map((province: StateProvince) => ({
      value: province.id,
      label: province.name,
    }));
    return formattedProvinces;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};

const fetchDistricts = async (provinceId: string) => {
  try {
    const response = await fetch("/api/district?provinceId=" + provinceId);
    const data = await response.json();
    const formattedProvinces = data.data.map((district: District) => ({
      value: district.id,
      label: district.name,
    }));
    return formattedProvinces;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};

type MunicipalityOption = Option & { wards: Option[] };

const fetchMunicipalities = async (districtId: string) => {
  try {
    const response = await fetch("/api/municipality?districtId=" + districtId);
    const data = await response.json();
    const formattedProvinces = data.data.map((municipality: Municipality) => ({
      value: municipality.id,
      label: municipality.name,
      wards: municipality.wards.map((ward) => ({
        value: ward.toString(),
        label: ward.toString(),
      })),
    }));
    return formattedProvinces;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};

export default function EditUserProfile({ initialData }: EditUserProfileProps) {
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [municipalityOptions, setMunicipalityOptions] = useState<
    MunicipalityOption[]
  >([]);
  const [wardOptions, setWardOptions] = useState<Option[]>([]);

  useEffect(() => {
    fetchProvinces().then((fetchedProvinces) => {
      setProvinceOptions(fetchedProvinces);
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData.name,
      dob: "",
      gender: "",
      phoneNo: initialData.phoneNumber,
      email: initialData.email,
      address: {
        provinceId: "",
        districtId: "",
        municipalityId: "",
        wardNo: 0,
        tole: "",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      dob: values.dob,
      gender: values.gender,
      address: {
        provinceId: values.address.provinceId,
        districtId: values.address.districtId,
        municipalityId: values.address.municipalityId,
        wardNo: values.address.wardNo,
        tole: values.address.tole,
      },
    };
    console.warn("Payload", payload);
    try {
      const response = await axios.post("/user", payload);

      console.warn("Response", response.data);

      if (response.status === 200) {
        // Handle success - you can add toast notification or redirect here
        console.warn("Profile updated successfully");
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      // Handle error - you can add toast notification here
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const handleProvinceChange = async (provinceId: string) => {
    form.setValue("address.districtId", "");
    form.setValue("address.municipalityId", "");
    form.setValue("address.wardNo", 0);
    const districts = await fetchDistricts(provinceId);
    setDistrictOptions(districts);
    setMunicipalityOptions([]);
    setWardOptions([]);
  };

  const handleDistrictChange = async (districtId: string) => {
    form.setValue("address.municipalityId", "");
    form.setValue("address.wardNo", 0);
    const municipalities = await fetchMunicipalities(districtId);
    setMunicipalityOptions(municipalities);
    setWardOptions([]);
  };

  const handleMunicipalityChange = (municipalityId: string) => {
    form.setValue("address.wardNo", 0);
    const municipality = municipalityOptions.find(
      (municipality) => municipality.value === municipalityId
    );
    setWardOptions(municipality?.wards ?? []);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="rounded-full w-32 h-32 relative">
            <AvatarImage src={"profileImage"} alt="Profile" />
            <AvatarFallback>{getFallbackName(initialData.name)}</AvatarFallback>

            <div className="absolute top-24 left-20 bg-slate-300 border rounded-full p-1">
              <Camera
                className="h-4 w-4"
                onClick={() =>
                  document.getElementById("profilePicture")?.click()
                }
              />
            </div>
          </Avatar>
          {/* <div className="">
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              accept="image/*"
             
            /> */}
          {/* <label
              htmlFor="profilePicture"
              className="flex items-center gap-2 text-sm cursor-pointer underline"
            >
              Change profile picture
            </label> */}
          {/* </div> */}
        </div>

        <div className="flex gap-4 w-full">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">
                  Full Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    disabled
                    className="font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">
                  Phone No.<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="font-medium"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  E-mail<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder=""
                    className="font-medium"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date of Birth */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  Date of Birth<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input className="font-work-sans" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">
                  Gender<span className="text-red-500">*</span>
                </FormLabel>
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
          />
        </div>

        {/* Address */}
        <LocationForm
          form={form}
          provinceOptions={provinceOptions}
          districtOptions={districtOptions}
          municipalityOptions={municipalityOptions}
          wardOptions={wardOptions}
          handleProvinceChange={handleProvinceChange}
          handleDistrictChange={handleDistrictChange}
          handleMunicipalityChange={handleMunicipalityChange}
        />

        <FormField
          control={form.control}
          name="address.tole"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Tole (Required)"
                  {...field}
                  className="font-work-sans font-normal"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="space-y-2">
          <FormLabel>Address</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address.province"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="province1">Province 1</SelectItem>
                      <SelectItem value="province2">Province 2</SelectItem>
                      <SelectItem value="province3">Province 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.district"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="District" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="district1">District 1</SelectItem>
                      <SelectItem value="district2">District 2</SelectItem>
                      <SelectItem value="district3">District 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.municipality"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Municipality" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.wardNo"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Ward No." />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
        </div> */}

        {/* Submit Button */}
        <div className="flex justify-center md:mt-3 py-2 md:mb-4">
          <Button
            type="submit"
            isLoading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
}
