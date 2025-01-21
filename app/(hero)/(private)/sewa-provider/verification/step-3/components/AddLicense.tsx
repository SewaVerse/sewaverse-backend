"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { licenseSchema } from "@/app/schemas/licenseSchema";
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

import FileUpload from "../components/ui/file-upload";

type FormValues = z.infer<typeof licenseSchema>;

interface AddLicenseProps {
  licenseOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: FormValues) => void;
}

export default function AddLicense({
  licenseOpen,
  onOpenChange,
  onSave,
}: AddLicenseProps) {
  const [licenseFile, setLicenseFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(licenseSchema),
    defaultValues: {
      licenseOf: "",
      licenseFrom: "",
      licenseNumber: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      // Create FormData instance
      const formData = new FormData();

      // Add file if it exists
      if (licenseFile) {
        formData.append("file", licenseFile);
      }

      // Add other form data as JSON
      formData.append("jsonData", JSON.stringify(data));

      // Make API call
      const response = await fetch("/api/service-provider/license", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save license");
      }

      const result = await response.json();
      console.warn("Result", result);

      toast.success("License added successfully");
      onSave?.(data);
      onOpenChange(false);
      form.reset();
      setLicenseFile(null);
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
    <Dialog open={licenseOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add License</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="licenseOf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    License Of<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Hair Styling" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    License From<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: State Board of Cosmetology"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    License Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: ABC123XYZ"
                      maxLength={15}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>License Document</FormLabel>
              <FileUpload
                accept="image/*"
                maxSize={1024 * 1024 * 5} // 5MB
                onFileSelect={(file: File) => setLicenseFile(file)}
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
