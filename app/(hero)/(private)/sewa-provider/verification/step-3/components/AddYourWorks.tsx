"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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

import  FileUpload  from "./ui/file-upload";

interface Work {
  id: number;
  title: string;
  description?: string;
  myWorkFile: { file?: File };
}

interface AddYourWorksProps {
  worksOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (work: Work) => void;
}

export default function AddYourWorks({
  worksOpen,
  onOpenChange,
}: AddYourWorksProps) {
  // const [myWork, setMyWork] = useState<File | null>(null);

  const form = useForm<MyWorkSchema>({
    resolver: zodResolver(myWorkSchema), // Use the zod schema for validation
    // defaultValues: {
    //   title: "",
    //   description: "",
    //   myWorkFile: undefined,
    // },
  });

  const onSubmit = async (data: MyWorkSchema) => {
    try {
      console.warn("Form Data:", data);

      const formData = new FormData();

      const jsonPayload = {
        title: data.title,
        description: data.description,
      };

      formData.append("jsonData", JSON.stringify(jsonPayload));

      if (data.myWorkFile?.file) {
        formData.append("file", data.myWorkFile.file);
      }

      const response = await fetch("/api/service-provider/mywork", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast.success("Work added successfully!");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add work"
      );
    }
  };

  return (
    <Dialog open={worksOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Showcase your previous works
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Work</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Hair Styling" />
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
                    <Textarea {...field} placeholder="Describe your work" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="myWorkFile.file"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Work Image</FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*"
                      maxSize={1024 * 1024 * 5}
                      onFileSelect={(file) => onChange(file)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="brand"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Adding..." : "Add Work"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
