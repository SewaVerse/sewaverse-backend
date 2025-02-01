"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  experienceYears: z.string({
    required_error: "Please select experience years.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

const experienceYearsOptions = [
  "1 Year",
  "2 Years",
  "3 Years",
  "4 Years",
  "5 Years",
  "6+ Years",
];

const categoryOptions = [
  "Hair Dresser",
  "Beautician",
  "Makeup Artist",
  "Nail Artist",
  "Massage Therapist",
];

interface EditWorkExperienceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (
    data: z.infer<typeof formSchema> & { certificate?: string }
  ) => void;
}

export default function EditWorkExperience({
  open,
  onOpenChange,
  onSave,
}: EditWorkExperienceProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showCertificate, setShowCertificate] = useState(true);
  const [certificate, setCertificate] = useState<string>("/placeholder.svg");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      companyName: "",
      experienceYears: "",
      category: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave?.({ ...values, certificate });
    onOpenChange(false);
  }

  const handleCertificateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificate(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Edit Work Experience
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Hair Dresser" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="experienceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
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
                        {experienceYearsOptions.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
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
                    <FormLabel className="text-black">
                      Category<span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category} value={category}>
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
                  <FormLabel className="text-black">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide Short Description of works"
                      className="min-h-[50px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Work Certificate</FormLabel>
              <div className="p-4 space-y-2 border rounded-lg">
                {showCertificate && (
                  <Image
                    src={certificate || "/placeholder.svg"}
                    alt="Work Certificate"
                    width={400}
                    height={300}
                    className="w-full h-[100px] object-contain rounded-lg"
                  />
                )}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <input
                      type="file"
                      id="certificate"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCertificateChange}
                    />
                  </div>
                </div>
              </div>
              <label
                htmlFor="certificate"
                className="text-sm text-blue-600 cursor-pointer hover:text-blue-800"
              >
                Change
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-sm text-red-600 hover:text-red-800"
                onClick={() => setCertificate("/placeholder.svg")}
              >
                Delete
              </Button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
               variant={"brand"}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
