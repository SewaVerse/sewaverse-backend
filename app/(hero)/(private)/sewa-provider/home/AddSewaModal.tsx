"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  offeredServiceSchema,
  type OfferedServiceSchema,
} from "@/app/schemas/offeredSchema";
import { priceTypes } from "@/app/utils/enumMap";
import MultiFileUpload from "@/components/multi-file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
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

interface ServiceCategory {
  id: string;
  name: string;
  description: string | null;
  parentServiceId: string;
}

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   serviceProvider: ServiceCategory[];
// }

export function AddSewaModal() {
  const [open, setOpen] = useState(true);
  // const [categories, setCategories] = useState<
  //   Record<
  //     string,
  //     { id: string; subCategories: { id: string; name: string }[] }
  //   >
  // >({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/service-provider/profile");
        const data = await response.json();

        if (data.success) {
          setCategories(data.serviceProvider.serviceCategories);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error loading categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleFileSelect = (files: File[]) => {
    setUploadedFiles(files);
  };

  const methods = useForm<OfferedServiceSchema>({
    resolver: zodResolver(offeredServiceSchema),
    defaultValues: {
      title: "",
      priceType: "hourly",
      discount: 0,
      published: true,
    },
  });

  // const serviceId = watch("serviceId");
  const price = methods.watch("price");
  const discount = methods.watch("discount");

  const onSubmit = async (data: OfferedServiceSchema) => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create FormData instance
      const formData = new FormData();
      formData.append("jsonData", JSON.stringify(data));

      // Add all images
      uploadedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/service-provider/offered-service", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary for FormData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create service");
      }

      toast.success("Sewa created successfully!");

      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create service"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    // fetchCategories();
  }, []);

  // const fetchServiceHierarchy = async () => {
  //   try {
  //     const response = await fetch("/api/service/hierarchy");
  //     const data = await response.json();

  //     console.warn("Data", data);

  //     if (data.success) {
  //       const transformedCategories: Record<
  //         string,
  //         { id: string; subCategories: { id: string; name: string }[] }
  //       > = {};

  //       data.data.forEach(
  //         (category: {
  //           id: string;
  //           name: string;
  //           services: { id: string; name: string }[];
  //         }) => {
  //           transformedCategories[category.name] = {
  //             id: category.id,
  //             subCategories: category.services.map((service) => ({
  //               id: service.id,
  //               name: service.name,
  //             })),
  //           };
  //         }
  //       );

  //       setCategories(transformedCategories);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching service hierarchy:", error);
  //   }
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add your Sewa</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-work-sans">
            Add your Sewa
          </DialogTitle>

          {/* <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Controller
              name="serviceId"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[200px] border-0 p-0 hover:bg-transparent focus:ring-0">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.entries(categories).flatMap(
                        ([categoryName, category]) =>
                          category.subCategories.map((subCategory) => (
                            <SelectItem
                              className="font-work-sans"
                              key={subCategory.id}
                              value={subCategory.id}
                            >
                              {categoryName} - {subCategory.name}
                            </SelectItem>
                          ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div> */}
          <FormProvider {...methods}>
            <FormField
              control={methods.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Categories</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading categories...
                        </SelectItem>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={methods.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Title<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Title of Sewa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Description<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={methods.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Price<span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="flex gap-2 w-full">
                              <Input
                                type="number"
                                placeholder="Rs."
                                min="0"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) => {
                                  const value = e.target.valueAsNumber;
                                  if (!isNaN(value) && value >= 0) {
                                    field.onChange(value); // Pass the number value directly
                                  } else if (e.target.value === "") {
                                    field.onChange(0); // Set to 0 when empty
                                  }
                                }}
                              />

                              <Controller
                                name="priceType"
                                control={methods.control}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger className="w-[120px]">
                                      <SelectValue placeholder="/hr" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {priceTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          /{type}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={methods.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              value={String(field.value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select discount" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">0%</SelectItem>
                                <SelectItem value="5">5%</SelectItem>
                                <SelectItem value="10">10%</SelectItem>
                                <SelectItem value="15">15%</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <FormItem>
                    <FormLabel>
                      Images of Sewa<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Card className="border">
                        <CardContent className="p-2">
                          <MultiFileUpload
                            accept="image/*"
                            maxSize={5 * 1024 * 1024}
                            onFileSelect={handleFileSelect}
                          />
                        </CardContent>
                      </Card>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              </div>

              {/* Rest of the form content remains the same */}
            </form>
          </FormProvider>
        </DialogHeader>

        <Card className="bg-muted/50">
          <CardContent className="p-4 space-y-2 font-work-sans">
            {price ? (
              <>
                <div className="flex justify-between text-sm">
                  <span className="gradient-text">Total price of Sewa:</span>
                  <span className="gradient-text">
                    Rs. {price}/{methods.watch("priceType")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="gradient-text">Discount ({discount}%):</span>
                  <span className="gradient-text">
                    - Rs. {((price * (discount ?? 0)) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="gradient-text">Price after discount:</span>
                  <span className="gradient-text">
                    Rs. {(price * (1 - (discount ?? 0) / 100)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="gradient-text">
                    15% Sewaverse service charge:
                  </span>
                  <span className="gradient-text">
                    - Rs.{" "}
                    {(price * 0.15 * (1 - (discount ?? 0) / 100)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="gradient-text">
                    15% Income Tax on service charge:
                  </span>
                  <span className="gradient-text">
                    - Rs.{" "}
                    {(
                      price *
                      0.15 *
                      0.15 *
                      (1 - (discount ?? 0) / 100)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium border-t pt-2 mt-2">
                  <span className="gradient-text">
                    Total amount you&apos;ll receive:
                  </span>
                  <span className="gradient-text">
                    Rs.{" "}
                    {(
                      price * (1 - (discount ?? 0) / 100) * 0.85 -
                      price * 0.15 * 0.15 * (1 - (discount ?? 0) / 100)
                    ).toFixed(2)}
                    /{methods.watch("priceType")}
                  </span>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground font-semibold">
          Note: 1.75% Transaction fee will be deducted if payment gateway is
          used
        </p>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="gradient-text"
          >
            Cancel
          </Button>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="gradient-text"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              variant="brand"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
