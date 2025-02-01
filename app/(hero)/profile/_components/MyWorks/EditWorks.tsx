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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  workName: z.string().min(2, {
    message: "Work name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

interface EditPreviousWorksProps {
  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;
}

export default function EditPreviousWorks({
  openEdit,
  setOpenEdit,
}: EditPreviousWorksProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workName: "",
      description: "",
    },
  });
  const [workImage, setWorkImage] = useState<string>("/placeholder.svg");
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWorkImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Edit your previous works
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="workName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Work</FormLabel>
                  <FormControl>
                    <Input placeholder="Hair Styling" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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

            <div className="space-y-4">
              <FormLabel>Work Photos</FormLabel>
              <div className="border rounded-lg p-4 space-y-2">
                <Image
                  src={workImage || "/placeholder.svg"}
                  alt="License"
                  width={400}
                  height={250}
                  className="w-full h-[100px] object-cover rounded-lg"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="file"
                    id="work-image"
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
                  <label
                    className="flex items-center "
                    onClick={() => setWorkImage("/placeholder.svg")}
                  >
                    <MdDelete size={14} />
                    Delete
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenEdit(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant={"brand"}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
