"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { District, Municipality, StateProvince } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  ProviderVerificationDetail,
  providerVerificationDetailSchema,
} from "@/app/schemas/providerVerification";
import FileUpload from "@/components/form/FileUpload";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ImagePreviewSlider from "./_components/image-preview";
import LocationForm from "./_components/location-form";

interface Option {
  value: string;
  label: string;
}

interface PreviewImage {
  url: string;
  name: string;
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

export default function SewaProviderDetailPage() {
  const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [municipalityOptions, setMunicipalityOptions] = useState<
    MunicipalityOption[]
  >([]);
  const [wardOptions, setWardOptions] = useState<Option[]>([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

  useEffect(() => {
    fetchProvinces().then((fetchedProvinces) => {
      setProvinceOptions(fetchedProvinces);
    });
  }, []);

  const form = useForm<ProviderVerificationDetail>({
    resolver: zodResolver(providerVerificationDetailSchema),
    defaultValues: {
      gender: "",
      dob: "",
      address: {
        provinceId: "",
        districtId: "",
        municipalityId: "",
        wardNo: 0,
        tole: "",
      },
      verificationDocument1: {
        documentType: "",
        documentNumber: "",
        frontFile: undefined,
        backFile: undefined,
      },
      verificationDocument2: {
        documentType: "pan_vat",
        documentNumber: "",
        frontFile: undefined,
      },
    },
  });

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

  const onSubmit = async (data: ProviderVerificationDetail) => {
    try {
      const formData = new FormData();

      const jsonPayload = {
        gender: data.gender,
        dob: data.dob,
        address: data.address,
        verificationDocument1: {
          documentType: data.verificationDocument1.documentType,
          documentNumber: data.verificationDocument1.documentNumber,
        },

        verificationDocument2: {
          documentType: data.verificationDocument2.documentType,
          documentNumber: data.verificationDocument2.documentNumber,
        },
      };

      // Add JSON payload to FormData
      formData.append("jsonData", JSON.stringify(jsonPayload));

      if (data.verificationDocument1.frontFile?.file) {
        formData.append(
          "document1.frontFile",
          data.verificationDocument1.frontFile.file
        );
      }
      if (data.verificationDocument1.backFile?.file) {
        formData.append(
          "document1.backFile",
          data.verificationDocument1.backFile.file
        );
      }
      if (data.verificationDocument2.frontFile?.file) {
        formData.append(
          "document2.frontFile",
          data.verificationDocument2.frontFile.file
        );
      }
      if (data.verificationDocument2.backFile?.file) {
        formData.append(
          "document2.backFile",
          data.verificationDocument2.backFile.file
        );
      }

      const response = await fetch(
        "/api/service-provider/verification/detail",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
      }
      await response.json();

      toast.success("Submitted Successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An unexpected error occurred.");
      }
    }
  };

  const handleFileChange = (fieldName: string, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImages((prev) => {
          // Remove existing preview for this field if it exists
          const filtered = prev.filter((p) => p.name !== fieldName);
          return [...filtered, { url: result, name: fieldName }];
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImages((prev) => prev.filter((p) => p.name !== fieldName));
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 w-full mx-auto">
      <div className="flex flex-col md:flex-row justify-around items-center gap-10">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full md:max-w-lg">
          <p className="text-center font-medium text-gray-500 text-xl mb-2">
            Step 1/3
          </p>
          <h2 className="text-center text-2xl font-semibold mb-2">
            Sewa Provider Details
          </h2>

          <div className="flex flex-col justify-between items-center text-xl text-gray-500 font-medium mb-2">
            <p>Individual</p>
          </div>
          <div className="w-full h-[3px] bg-brand-gradient mb-4"></div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <h1 className="font-medium text-base">Gender</h1>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="others">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <h1 className="font-medium text-base">Date of Birth</h1>
                      <FormControl>
                        <Input
                          className="font-work-sans"
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      {/* <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
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
                          placeholder="Tole"
                          {...field}
                          className="font-work-sans font-normal"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">
                    Verification Documents
                  </h3>
                  <p className="text-base gradient-text">Personal Documents</p>
                </div>

                <FormField
                  control={form.control}
                  name="verificationDocument1.documentType"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDocument(value); // Update state on selection
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Document" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-open-sans">
                          <SelectItem value="citizenship">
                            Citizenship
                          </SelectItem>
                          <SelectItem value="nationalcard">
                            National Identity Card
                          </SelectItem>
                          <SelectItem value="drivinglicense">
                            Driver&apos;s License
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4">
                {selectedDocument === "drivinglicense" ? (
                  <div>
                    <FormField
                      control={form.control}
                      name="verificationDocument1.frontFile.file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="p-1 font-work-sans text-base">
                            License Image
                          </FormLabel>
                          <FileUpload
                            form={form}
                            name="verificationDocument1.frontFile.file"
                            onFileChange={(file) => {
                              field.onChange(file);
                              handleFileChange("License Image", file);
                            }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <FormField
                        control={form.control}
                        name="verificationDocument1.frontFile.file"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="p-1 font-work-sans text-base">
                              {selectedDocument === "citizenship"
                                ? "Citizenship Front"
                                : selectedDocument === "nationalcard"
                                ? "NID Front"
                                : "Front Side"}
                            </FormLabel>
                            <FileUpload
                              form={form}
                              name="verificationDocument1.frontFile.file"
                              onFileChange={(file) => {
                                field.onChange(file);
                                handleFileChange("Front Side", file);
                              }}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="verificationDocument1.backFile.file"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="p-1 font-work-sans text-base">
                              {selectedDocument === "citizenship"
                                ? "Citizenship Back"
                                : selectedDocument === "nationalcard"
                                ? "NID Back"
                                : "Back Side"}
                            </FormLabel>
                            <FileUpload
                              form={form}
                              name="verificationDocument1.backFile.file"
                              onFileChange={(file) => {
                                field.onChange(file);
                                handleFileChange("Back Side", file);
                              }}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* PAN Card section */}
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="verificationDocument2.documentNumber" // Correctly using nested property
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-work-sans text-base">
                        PAN Number
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormField
                    control={form.control}
                    name="verificationDocument2.frontFile.file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-work-sans text-base">
                          PAN Image
                        </FormLabel>
                        <FileUpload
                          form={form}
                          name="verificationDocument2.frontFile.file"
                          onFileChange={(file) => {
                            field.onChange(file);
                            handleFileChange("PAN Front", file);
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant={"brand"}
                className="w-full mt-6"
                // disabled={
                //   !form.formState.isValid || form.formState.isSubmitting
                // }
              >
                {form.formState.isSubmitting ? "Submitting..." : "Proceed"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Preview Section */}
        <ImagePreviewSlider previewImages={previewImages} />
      </div>
    </div>
  );
}
