import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FileUpload from "@/app/(hero)/(private)/sewa-provider/verification/step-3/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UploadProfilePictureProps {
  openUploadProfile: boolean;
  setOpenUploadProfile: (value: boolean) => void;
  onImageUpload: (url: string) => void;
}

interface FormData {
  file: File | null;
}

const UploadProfilePicture = ({
  openUploadProfile,
  setOpenUploadProfile,
  onImageUpload,
}: UploadProfilePictureProps) => {
  const methods = useForm<FormData>({
    defaultValues: {
      file: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.file) {
        throw new Error("Please select an image");
      }

      const formData = new FormData();
      formData.append("file", data.file);

      const response = await fetch("/api/service-provider/business-profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload image");
      }

      const result = await response.json();
      onImageUpload(result.url);
      setOpenUploadProfile(false);
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image"
      );
    }
  };

  return (
    <Dialog open={openUploadProfile} onOpenChange={setOpenUploadProfile}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Profile Picture</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FileUpload
              accept="image/*"
              maxSize={5 * 1024 * 1024}
              onFileSelect={(file) => methods.setValue("file", file)}
            />
            <Button
              type="submit"
              variant="brand"
              className="w-full"
              disabled={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UploadProfilePicture;
