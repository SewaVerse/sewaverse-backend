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

const formSchema = z.object({
  awardOf: z.string().min(2, {
    message: "award name must be at least 2 characters.",
  }),
  awardYear: z.string().min(1, {
    message: "award year is required.",
  }),
  awardBy: z.string().min(2, {
    message: "Institution name must be at least 2 characters.",
  }),
});

interface EditLicenseFormProps {
  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;
  onSave?: (data: z.infer<typeof formSchema>) => void;
}

export default function EditAward({
  openEdit,
  setOpenEdit,
  onSave,
}: EditLicenseFormProps) {
  const [awardImage, setAwardImage] = useState<string>("/placeholder.svg");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awardOf: "",
      awardYear: "",
      awardBy: "",
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
        setAwardImage(reader.result as string);
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
              Edit Awards & Achievements
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="awardOf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
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
              name="awardYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Award Year </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="awardBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Award From</FormLabel>
                  <FormControl>
                    <Input placeholder="Institution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="relative">
                <div className="border rounded-lg p-4 space-y-2">
                  <Image
                    src={awardImage || "/placeholder.svg"}
                    alt="award"
                    width={400}
                    height={250}
                    className="w-full h-[100px] object-cover rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center">
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
                      className="cursor-pointer text-sm flex items-center gap-1 "
                    >
                      <Input type="radio" className="w-4" />
                      Change
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
