"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { fileSchema } from "@/app/schemas/fileSchema";
import FileUpload from "@/components/form/FileUpload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormData = {
  file: File | undefined;
};

interface UploadProfilePictureProps {
  openUploadProfile: boolean;
  setOpenUploadProfile: (open: boolean) => void;
}

export default function UploadProfilePicture({
  openUploadProfile,
  setOpenUploadProfile,
}: UploadProfilePictureProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = (data: FormData) => {
    if (!data.file) {
      console.error("File is missing");
      return;
    }

    // console.log("File data:", data);

    const formData = new FormData();
    formData.append("file", data.file);

    // console.log("FormData ready to submit:", formData);
  };

  return (
    <Dialog open={openUploadProfile} onOpenChange={setOpenUploadProfile}>
      <DialogContent className="sm:max-w-[600px] h-[500px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center">
            Upload Profile Picture
          </DialogTitle>
          <DialogDescription className="text-center">
            Upload an image file to create your identity.
          </DialogDescription>
        </DialogHeader>

        {/* <div className="text-center space-y-4 py-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              Upload your profile picture
            </h2>
            <p className="text-base text-muted-foreground">
              Convey professionalism and approachability. Let people know you.
            </p>
          </div> */}

        {/* Wrap the form inside FormProvider */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* FileUpload Component */}
            <FileUpload
              form={form}
              name="file"
              description="Upload an image file (Max size: 5MB)."
            />

            {/* Display validation error for the file */}
            {form.formState.errors.file && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.file.message}
              </p>
            )}

            <Button type="submit" variant={"brand"} className="w-full">
              Upload
            </Button>
          </form>
        </FormProvider>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
}
