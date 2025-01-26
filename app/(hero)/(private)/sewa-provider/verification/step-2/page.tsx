"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  providerVerificationTwo,
  type ProviderVerificationTwo,
} from "@/app/schemas/providerVerificationTwo";
import { ProfileCard } from "@/components/profile-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AwardsAndCertifications from "../step-3/components/AwardsAndCertifications";
import HeroSection from "../step-3/components/HeroSection";
import License from "../step-3/components/License";
import MyWorks from "../step-3/components/MyWorks";
import FileUpload from "../step-3/components/ui/file-upload";
import WorkExperiences from "../step-3/components/WorkExperiences";
import SelectServices from "./components/SelectServices";

// Define the form data type
// type FormData = {
//   profession: string;
//   skills: string[]; // Array of strings
//   experience: string;
//   serviceSubCategory: string[];
//   location: string[];
//   file?: File;
//   description: string;
// };

interface SelectedService {
  categoryId: string;
  categoryName: string;
  subCategories: { id: string; name: string }[];
}

export default function SewaProviderStepTwo() {
  const [openSelectServices, setOpenSelectServices] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState<string>("");

  const router = useRouter();

  const form = useForm<ProviderVerificationTwo>({
    resolver: zodResolver(providerVerificationTwo),
    defaultValues: {
      profession: "",
      experience: "",
      skills: [],
      location: ["kathmandu"],
      serviceSubCategory: [],
    },
  });

  const handleAddLocation = (newLocation: string) => {
    if (newLocation.trim() && !selectedLocations.includes(newLocation.trim())) {
      const newLocations = [...selectedLocations, newLocation.trim()];
      setSelectedLocations(newLocations);
      form.setValue("location", newLocations, {
        shouldValidate: true,
      });
    }
    setLocationInput("");
  };

  const handleRemoveLocation = (locationToRemove: string) => {
    const newLocations = selectedLocations.filter(
      (loc) => loc !== locationToRemove
    );
    setSelectedLocations(newLocations);
    form.setValue("location", newLocations, {
      shouldValidate: true,
    });
  };

  const handleServiceSelect = (selected: SelectedService[]) => {
    setSelectedServices(selected);
    const allSubCategoryIds = selected.flatMap((s) =>
      s.subCategories.map((sc) => sc.id)
    );
    form.setValue("serviceSubCategory", allSubCategoryIds);
  };

  const handleAddSkill = (newSkill: string) => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      form.setValue("skills", updatedSkills, {
        shouldValidate: true,
      });
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    form.setValue("skills", updatedSkills, {
      shouldValidate: true,
    });
  };

  const handleRemoveSubCategory = (
    categoryId: string,
    subCategoryId: string
  ) => {
    setSelectedServices((prev) =>
      prev
        .map((service) => {
          if (service.categoryId === categoryId) {
            return {
              ...service,
              subCategories: service.subCategories.filter(
                (sub) => sub.id !== subCategoryId
              ),
            };
          }
          return service;
        })
        .filter((service) => service.subCategories.length > 0)
    );

    // Update form value to remove the subcategory ID
    const currentSubCategories = form.getValues("serviceSubCategory");
    form.setValue(
      "serviceSubCategory",
      currentSubCategories.filter((id) => id !== subCategoryId)
    );
  };

  const handleRemoveAllServices = () => {
    setSelectedServices([]);
    form.setValue("serviceSubCategory", []);
  };

  const onSubmit = async (data: ProviderVerificationTwo) => {
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("profession", data.profession);
      formData.append("skills", data.skills.join(","));
      formData.append("experience", data.experience);
      formData.append("serviceSubCategory", data.serviceSubCategory.join(","));
      formData.append("location", data.location.join(","));

      if (data.file) {
        formData.append("file", data.file);
      }

      console.warn("Data", data);
      console.warn("Form Data", formData);

      const response = await fetch(
        "/api/service-provider/verification/detail/business-profile",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
      }

      await response.json();

      toast.success("Profile updated successfully!");
      router.push("/sewa-provider/verification/step-3");
    } catch (error) {
      console.error("5. Error Details:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full md:w-1/4 rounded-lg shadow border p-4 lg:ml-10">
        <h3 className="text-lg font-semibold text-center mb-2">Step 2/3</h3>
        <h3 className="text-lg font-semibold text-center">
          Create your business profile
        </h3>
        <p className="text-sm text-muted-foreground mt-4 text-justify font-open-sans mb-4">
          Create your professional business profile—it&apos;s your first
          impression. Highlight your expertise, showcase your strengths, and
          help customers see why you&apos;re the right choice.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel className="font-work-sans">
                    Upload Profile Picture
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                      onFileSelect={(file) => {
                        form.setValue("file", file, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Profession (Required*)"
                      className="border-2 border-slate-300 rounded-md font-work-sans"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-2 border-slate-300 rounded-md font-work-sans">
                        <SelectValue placeholder="Experience (Required*)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-work-sans">
                      <SelectItem value="freshers">Fresher</SelectItem>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="2">2 years</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="4">4 years</SelectItem>
                      <SelectItem value="5">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="border-2 border-slate-300 rounded-md flex items-center justify-between p-4 font-work-sans">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Offered Services <br />
                  <span className="text-muted-foreground text-xs">
                    (Required*)
                  </span>
                </FormLabel>
                <div
                  className="h-10 border-2 border-dashed border-slate-500 cursor-pointer flex items-center p-2 rounded-md"
                  onClick={() => setOpenSelectServices(true)}
                >
                  <CirclePlus className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-xs text-muted-foreground">
                    Add Sewa
                  </span>
                </div>
              </div>

              {selectedServices.length > 0 && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-work-sans">
                      Selected Services
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveAllServices}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[100px] w-full pr-4">
                      <div className="flex flex-wrap gap-2 font-work-sans">
                        {selectedServices.flatMap((service) =>
                          service.subCategories.map((sub) => (
                            <Badge
                              key={sub.id}
                              variant="secondary"
                              className="flex items-center gap-1 px-2 py-1 bg-transparent border border-slate-300 hover:bg-slate-200"
                            >
                              <span className="text-sm font-normal ">
                                {sub.name}
                              </span>
                              <div
                                onClick={() =>
                                  handleRemoveSubCategory(
                                    service.categoryId,
                                    sub.id
                                  )
                                }
                                className="p-1 border-slate-300"
                              >
                                <X className="size-3 text-red-500 cursor-pointer" />
                                {/* <span className="sr-only">Remove</span> */}
                              </div>
                            </Badge>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>

            <FormField
              control={form.control}
              name="skills"
              render={({}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Skills (Required*)"
                      className="border-2 border-slate-300 rounded-md font-work-sans"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSkill(skillInput);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center border rounded-md px-3 py-1 text-sm font-work-sans hover:bg-slate-200"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-red-500"
                        >
                          <X className="size-3 cursor-pointer" />
                        </button>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Location of Service (Required*)"
                      className="border-2 border-slate-300 rounded-md font-work-sans"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddLocation(locationInput);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedLocations.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center border rounded-md px-3 py-1 text-sm font-work-sans hover:bg-slate-200"
                      >
                        <span>{location}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLocation(location)}
                          className="ml-2 text-red-500"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
            {/* <LocationDialog /> */}

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

      <div className="flex-1 hidden lg:block lg:mr-10 border">
        {/* <div className="bg-blue-300 h-[35vh] p-6 rounded-lg shadow"></div> */}
        <div className="flex items-center justify-center cursor-not-allowed">
          <ProfileCard
            name={""}
            createdAt={""}
            servicesDelivered={0}
            profession={""}
            experience={""}
            rating={0}
            offeredServices={[]}
            locations={[]}
            coreSkills={[]} // name={formData.name || "Your Name"}
            // joinDate={new Date().toLocaleDateString()}
            // servicesDelivered={0}
            // profession={formData.profession || "Your Profession"}
            // experience={formData.experience || "Experience"}
            // rating={0}
            // offeredServices={formData.services}
            // locations={formData.locations}
            // coreSkills={formData.skills}
            // imageUrl={formData.imageUrl}
          />
        </div>

        <div className="bg-gray-50 opacity-50 cursor-not-allowed px-10">
          <HeroSection />
          <h2 className="text-2xl font-bold mt-4 mb-8">About Me</h2>
          <WorkExperiences experiences={[]} />
          <License licenses={[]} />
          <AwardsAndCertifications awards={[]} />
          <MyWorks works={[]} />
        </div>
      </div>

      {openSelectServices && (
        <SelectServices
          openSelectServices={openSelectServices}
          setOpenSelectServices={setOpenSelectServices}
          onServiceSelect={handleServiceSelect}
          selectedServices={selectedServices}
        />
      )}
    </div>
  );
}
