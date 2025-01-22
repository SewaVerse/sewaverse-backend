"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { workExperienceSchema } from "@/app/schemas/workExperienceSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";

import FileUpload from "../components/ui/file-upload";

type FormValues = z.infer<typeof workExperienceSchema>;

interface Profile {
  serviceSubCategory: string[];
  // ... other fields
}

interface ServiceProvider {
  profile: Profile;
  // ... other fields
}

interface ApiResponse {
  success: boolean;
  message: string;
  serviceProvider: ServiceProvider;
}
interface AddWorkExperienceProps {
  modalOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: FormValues) => void;
}

export default function AddWorkExperience({
  modalOpen,
  onOpenChange,
  onSave,
}: AddWorkExperienceProps) {
  const [verificationFile, setVerificationFile] = React.useState<File | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/service-provider/profile");
        const data: ApiResponse = await response.json();

        if (data.success && data.serviceProvider.profile) {
          setCategories(data.serviceProvider.profile.serviceSubCategory);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const form = useForm<FormValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      duration: "",
      category: "",
      description: "",
      serviceId: "678897207b094b846f1fd04b",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      // Create FormData instance
      const formData = new FormData();

      // Add file if it exists
      if (verificationFile) {
        formData.append("file", verificationFile);
      }

      // Add other form data as JSON
      formData.append("jsonData", JSON.stringify(data));

      // Make API call
      const response = await fetch("/api/service-provider/experience", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save work experience");
      }

      const result = await response.json();

      console.warn("Result", result.message);

      toast.success("Work experience added successfully");
      onSave?.(data);
      onOpenChange(false);
      form.reset();
      setVerificationFile(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Work Experience
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Hair Dresser" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Style Studio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Experience years<span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select years" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category<span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isLoading ? "Loading..." : "Select category"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide Short Description of works"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Work Certificate</FormLabel>
              <FileUpload
                accept="image/*"
                maxSize={1024 * 1024 * 5}
                onFileSelect={(file) => setVerificationFile(file)}
              />
            </div>

            <div className="flex justify-between items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="brand" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
