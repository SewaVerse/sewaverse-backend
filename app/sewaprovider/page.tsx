"use client";
import { District, Municipality, StateProvince } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import FileUpload from "@/components/form/FileUpload";
import Input from "@/components/form/Input";
import Select, { Option } from "@/components/form/Select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Define Form Data Interface
interface SewaProviderDetailsFormData {
  gender: string;
  dateOfBirth: string;
  provinceId: string;
  districtId: string;
  municipalityId: string;
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

export default function SewaProviderDetails() {
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [municipalityOptions, setMunicipalityOptions] = useState<
    MunicipalityOption[]
  >([]);
  const [wardOptions, setWardOptions] = useState<Option[]>([]);

  // Fetch Province Data
  useEffect(() => {
    fetchProvinces().then((fetchedProvinces) => {
      setProvinceOptions(fetchedProvinces);
    });
  }, []);
  const form = useForm<SewaProviderDetailsFormData>({
    defaultValues: {
      name: "",
      citizenshipFront: "",
      gender: "",
    },
  });

  // Handle Province Change
  const handleProvinceChange = async (provinceId: string) => {
    form.setValue("districtId", "");
    form.setValue("municipalityId", "");
    form.setValue("wardNo", "");
    const districts = await fetchDistricts(provinceId);
    setDistrictOptions(districts);
    setMunicipalityOptions([]);
    setWardOptions([]);
  };

  // Handle District Change
  const handleDistrictChange = async (districtId: string) => {
    form.setValue("municipalityId", "");
    form.setValue("wardNo", "");
    const municipalities = await fetchMunicipalities(districtId);
    setMunicipalityOptions(municipalities);
    setWardOptions([]);
  };

  // Handle Municipality Change
  const handleMunicipalityChange = (municipalityId: string) => {
    form.setValue("wardNo", "");
    const municipality = municipalityOptions.find(
      (municipality) => municipality.value === municipalityId
    );
    setWardOptions(municipality?.wards ?? []);
  };

  // Handle Form Submission
  const onSubmit = (data: SewaProviderDetailsFormData) => {
    console.error("Form Data:", data);
  };

  return (
    <Form {...form}>
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:max-w-lg">
            {/* Title */}
            <h2 className="text-center text-2xl text-black mb-4">
              Sewa Provider Details
            </h2>

            {/* Tab Info */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <p>Individual</p>
              <p>Step 1/3</p>
            </div>
            <div className="w-full h-[2px] bg-[#2E3192] mb-4"></div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Gender and Date of Birth Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="relative">
                  <label
                    className="block mb-2 text-sm font-medium"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <Select
                    className="border rounded-xl"
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
                    className="block w-full py-2 border border-gray-200 rounded-xl px-3"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div>
                <label className="block mb-2 text-md font-sm">Address</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Select
                    className="rounded-xl"
                    form={form}
                    name="provinceId"
                    placeholder="Select Province"
                    options={provinceOptions}
                    onChange={(value) => handleProvinceChange(value)}
                  />
                  <Select
                    className="rounded-xl"
                    form={form}
                    name="districtId"
                    placeholder="Select District"
                    options={districtOptions}
                    onChange={(value) => handleDistrictChange(value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Select
                    className="rounded-xl"
                    form={form}
                    name="municipalityId"
                    placeholder="Select Municipality"
                    options={municipalityOptions}
                    onChange={(value) => handleMunicipalityChange(value)}
                  />
                  <Select
                    className="rounded-xl"
                    form={form}
                    name="wardNo"
                    placeholder="Select Ward No"
                    options={wardOptions}
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
                <div className="flex flex-col mb-4">
                  <label className="text-lg font-medium">
                    Verification Documents
                  </label>
                  <label className="text-sm font-sm gradient-text">
                    Personal Documents
                  </label>
                </div>

                {/* Citizenship Selection */}
                <div className="mb-4">
                  <Select
                    className="rounded-xl"
                    form={form}
                    name="citizenship"
                    placeholder="Select Citizenship"
                    options={[
                      { value: "citizenship", label: "Citizenship" },
                      {
                        value: "nationalIdentityCard",
                        label: "National Identity Card",
                      },
                      { value: "driversLicense", label: "Driver's License" },
                    ]}
                  />
                </div>

                {/* Document Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 px-2">
                      Front Side
                    </label>
                    <FileUpload form={form} name="citizenshipFront" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 px-2">
                      Back Side
                    </label>
                    <FileUpload form={form} name="citizenshipBack" />
                  </div>
                </div>
              </div>

              {/* PAN Card Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-sm px-2">
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
                  <label className="block text-sm font-sm px-2">
                    PAN Card Image
                  </label>
                  <FileUpload form={form} name="panCard" />
                </div>
              </div>

              {/* Proceed Button */}
              <Button
                variant="brand"
                type="submit"
                className="w-full text-white py-3 rounded-xl shadow-md"
              >
                Proceed
              </Button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="w-full md:w-dvw">
            <label className="block mb-2 text-lg text-black font-sm text-center">
              Preview of Document
            </label>
            <div className="border-[2px] border-dashed border-black h-80 flex items-center justify-center">
              <span className="text-center">image</span>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
