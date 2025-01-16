import { Upload, X } from "lucide-react"; // Icon library
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  accept: string;
  maxSize: number;
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSize,
  onFileSelect,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file)); // Generate preview URL
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { [accept]: [] },
      maxSize,
      multiple: false,
    });

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary relative"
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative flex justify-center">
            <Image
              src={preview}
              alt="Preview"
              width={128}
              height={128}
              className="w-auto h-32 object-cover rounded-md"
            />
            {/* X icon for deletion */}
            <div
              className="absolute top-24 right-18 bg-red-500 text-white rounded-full p-1 cursor-pointer"
              onClick={handleRemoveFile}
            >
              <X className="w-4 h-4" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-12 h-12 text-gray-400" />
            <div className="text-sm text-muted-foreground text-center">
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>Drag & drop file here, or click to select file</p>
              )}
            </div>
          </div>
        )}
      </div>
      {fileRejections.length > 0 && (
        <p className="text-sm text-red-500 mt-2">
          File type or size not accepted. Please try again.
        </p>
      )}
    </div>
  );
};
