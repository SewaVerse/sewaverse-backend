import { CloudUpload, X } from "lucide-react"; // Icon library
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

interface FileUploadProps {
  accept: string;
  maxSize: number;
  onFileSelect: (files: File[]) => void;
}

const MultiFileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSize,
  onFileSelect,
}) => {
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>(
    []
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (previews.length + acceptedFiles.length > 3) {
        toast.error("You can upload a maximum of 3 images.");
        return;
      }

      const newPreviews = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setPreviews((prev) => [...prev, ...newPreviews]); // Add new files to previews
      onFileSelect([...previews.map((p) => p.file), ...acceptedFiles]); // Pass all files to parent
    },
    [onFileSelect, previews]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { [accept]: [] },
      maxSize,
      multiple: true,
    });

  const handleRemoveFile = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews); // Update state
    onFileSelect(updatedPreviews.map((p) => p.file)); // Update parent
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-2 cursor-pointer hover:border-primary relative"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 p-2">
          <CloudUpload className="w-14 h-14 text-gray-400" />
          <div className="text-sm text-muted-foreground text-center">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {previews.map((item, index) => (
          <div key={index} className="relative mt-4">
            <Image
              src={item.preview}
              alt={`Preview ${index + 1}`}
              width={128}
              height={128}
              className="w-full h-28 object-cover rounded-md"
            />
            {/* X icon for deletion */}
            <div
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer"
              onClick={() => handleRemoveFile(index)}
            >
              <X className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
      {fileRejections.length > 0 && (
        <p className="text-sm text-red-500 mt-2">
          File type or size not accepted. Please try again.
        </p>
      )}
    </div>
  );
};

export default MultiFileUpload;
