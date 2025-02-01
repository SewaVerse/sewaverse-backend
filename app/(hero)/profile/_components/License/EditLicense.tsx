"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
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

const formSchema = z.object({
  licenseOf: z.string().min(2, {
    message: "License name must be at least 2 characters.",
  }),
  licenseNumber: z.string().min(1, {
    message: "License number is required.",
  }),
  issuedBy: z.string().min(2, {
    message: "Institution name must be at least 2 characters.",
  }),
});

interface EditLicenseFormProps {
  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;
  onSave?: (data: z.infer<typeof formSchema>) => void;
}

export default function EditLicense({
  openEdit,
  setOpenEdit,
  onSave,
}: EditLicenseFormProps) {
  const [licenseImage, setLicenseImage] = useState<string>("/placeholder.svg");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseOf: "",
      licenseNumber: "",
      issuedBy: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.warn(values);
    onSave?.(values);
    setOpenEdit(false);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLicenseImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Edit License
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="licenseOf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    License of<span className="text-red-500">*</span>
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
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="111" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issuedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issued By</FormLabel>
                  <FormControl>
                    <Input placeholder="Institution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div>
                <FormLabel>License</FormLabel>
              </div>
              <div className="relative">
                <div className="p-4 space-y-2 border rounded-lg">
                  <Image
                    src={licenseImage || "/placeholder.svg"}
                    alt="License"
                    width={400}
                    height={250}
                    className="w-full h-[100px] object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="file"
                      id="license-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="license-image"
                      className="flex items-center gap-1 text-sm cursor-pointer "
                    >
                      <Input type="radio" className="w-4" />
                      Change
                    </label>
                    <label
                      className="flex items-center "
                      onClick={() => setLicenseImage("/placeholder.svg")}
                    >
                      <MdDelete size={14} />
                      Delete
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                size={"md"}
                onClick={() => setOpenEdit(false)}
              >
                Cancel
              </Button>
              <Button variant={"brand"} size={"md"}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
