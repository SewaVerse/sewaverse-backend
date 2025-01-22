"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { awardSchema } from "@/app/schemas/awardSchema";
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

import  FileUpload  from "./ui/file-upload";

// interface Award {
//   id: number;
//   title: string;
//   year: string;
//   from: string;
//   certificateUrl?: string;
// }

type FormValues = z.infer<typeof awardSchema>;

interface AddAchievementsProps {
  awardOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (award: FormValues) => void;
}

export default function AddAchievements({
  awardOpen,
  onOpenChange,
  onSave,
}: AddAchievementsProps) {
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      title: "",
      year: "",
      awardFrom: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      // Create FormData instance
      const formData = new FormData();

      // Add file if it exists
      if (certificateFile) {
        formData.append("file", certificateFile);
      }

      // Add other form data as JSON
      formData.append("jsonData", JSON.stringify(data));

      // Make API call
      const response = await fetch("/api/service-provider/award", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save award");
      }

      const result = await response.json();
      console.warn(result);

      // Create local award object for UI update
      // const newAward: AwardSchema = {
      //   title: data.title,
      //   year: data.year,
      //   awardFrom: data.awardFrom,
      //   awardFile: certificateFile
      //     ? URL.createObjectURL(certificateFile)
      //     : undefined,
      // };

      toast.success("Award added successfully");
      onSave?.(data);
      onOpenChange(false);
      form.reset();
      setCertificateFile(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={awardOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Add Awards & Achievements
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Hair Styling Competition"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Award Year<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number" // Use 'number' for year input
                        placeholder="Ex: 2024"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="awardFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Award From<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Institution name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Certificate</FormLabel>
                <FileUpload
                  accept="image/*"
                  maxSize={1024 * 1024 * 5}
                  onFileSelect={(file) => setCertificateFile(file)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <p className="text-[12px] text-muted-foreground">
                You can add multiple Achievements later from &apos;Edit
                Profile&apos;.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="gradient-text"
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
