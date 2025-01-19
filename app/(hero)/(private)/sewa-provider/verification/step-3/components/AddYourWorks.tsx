"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { myWorkSchema, MyWorkSchema } from "@/app/schemas/myWorkSchema";
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

import { FileUpload } from "./ui/file-upload";

interface Work {
  id: number;
  title: string;
  description?: string;
  file?: File;
}

interface AddYourWorksProps {
  worksOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (work: Work) => void;
}

export default function AddYourWorks({
  worksOpen,
  onOpenChange,
  onSave,
}: AddYourWorksProps) {
  const [myWork, setMyWork] = useState<File | null>(null);

  const form = useForm<MyWorkSchema>({
    resolver: zodResolver(myWorkSchema), // Use the zod schema for validation
    defaultValues: {
      title: "",
      description: "",
      myWorkfile: undefined,
    },
  });

  const onSubmit = (data: MyWorkSchema) => {
    console.warn("Form Data:", data);

    const newWork: Work = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      file: myWork!,
    };

    onSave(newWork);
    onOpenChange(false);
    form.reset(); // Reset form after submission
  };

  return (
    <Dialog open={worksOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Showcase your previous works
            </DialogTitle>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of Work</FormLabel>
                    <FormControl>
                      <Input
                        id="workName"
                        placeholder="Ex: Hair Styling"
                        {...field}
                      />
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
                        id="description"
                        placeholder="Provide Short Description of works"
                        className="min-h-[100px] resize-none"
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
                  onFileSelect={(file) => {
                    setMyWork(file);
                    form.setValue("myWorkfile", file ? { file } : undefined);
                  }}
                />
                {form.formState.errors.myWorkfile && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.myWorkfile.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div>
                <p className="text-[12px] text-muted-foreground">
                  You can add multiple Works later from &apos;Edit
                  Profile&apos;.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="gradient-text"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="brand">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
