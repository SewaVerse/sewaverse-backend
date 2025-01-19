import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FileUpload from "@/components/form/FileUpload";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface UploadProfilePictureProps {
  onImageUpload: (url: string) => void;
  openUploadProfile: boolean;
  setOpenUploadProfile: (value: boolean) => void;
}

interface FormData {
  file: FileList;
}

const UploadProfilePicture = ({
  openUploadProfile,
  setOpenUploadProfile,
  onImageUpload,
}: UploadProfilePictureProps) => {
  const methods = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);

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
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FileUpload
              form={methods}
              name="file"
              description="Upload profile picture (Max size: 5MB)"
              // accept="image/*"
            />
            {methods.formState.errors.file && (
              <p className="text-red-500 text-sm">
                {methods.formState.errors.file.message}
              </p>
            )}
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
