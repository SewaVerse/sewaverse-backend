// "use client";

// import { CloudUpload, Paperclip } from "lucide-react";
// import { useState } from "react";
// import { UseFormReturn } from "react-hook-form";

// import {
//   FileInput,
//   FileUploader,
//   FileUploaderContent,
//   FileUploaderItem,
// } from "../ui/file-upload";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";

// type FileUploadProps = {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   form: UseFormReturn<any>;
//   name: string;
//   placeholder?: string;
//   label?: string;
//   description?: string;
//   className?: string;
//   disabled?: boolean;
// };

// const FileUpload: React.FC<FileUploadProps> = ({
//   form,
//   name,
//   label,
//   description,
// }) => {
//   const [files, setFiles] = useState<File[] | null>([]);

//   const dropZoneConfig = {
//     maxFiles: 5,
//     maxSize: 1024 * 1024 * 4,
//     multiple: true,
//   };

//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={() => (
//         <FormItem>
//           {label && <FormLabel>{label}</FormLabel>}
//           <FormControl>
//             <FileUploader
//               value={files}
//               onValueChange={setFiles}
//               dropzoneOptions={dropZoneConfig}
//               className="relative bg-background rounded-lg p-2"
//             >
//               <FileInput
//                 id="fileInput"
//                 className="outline-dashed outline-1 outline-slate-500"
//               >
//                 <div className="flex items-center justify-center flex-col p-8 w-full ">
//                   <CloudUpload className="text-gray-500 w-10 h-10" />
//                   <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
//                     <span className="font-semibold">Click to upload</span>
//                     &nbsp; or drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     SVG, PNG, JPG or GIF
//                   </p>
//                 </div>
//               </FileInput>
//               <FileUploaderContent>
//                 {files &&
//                   files.length > 0 &&
//                   files.map((file, i) => (
//                     <FileUploaderItem key={i} index={i}>
//                       <Paperclip className="h-4 w-4 stroke-current" />
//                       <span>{file.name}</span>
//                     </FileUploaderItem>
//                   ))}
//               </FileUploaderContent>
//             </FileUploader>
//           </FormControl>
//           {description && <FormDescription>{description}</FormDescription>}
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

// export default FileUpload;

import { CloudUpload, Paperclip } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "../ui/file-upload";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type FileUploadProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  placeholder?: string;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  onFileChange?: (file: File | null) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({
  form,
  name,
  label,
  description,
  onFileChange,
}) => {
  const [files, setFiles] = useState<File[] | null>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const dropZoneConfig = {
    maxFiles: 1, // Changed to 1 since we're handling single file uploads
    maxSize: 1024 * 1024 * 4,
    multiple: false, // Changed to false for single file
  };

  // const handleFileChange = (uploadedFiles: File[] | null) => {
  //   setFiles(uploadedFiles);
  //   const file =
  //     uploadedFiles && uploadedFiles.length > 0 ? uploadedFiles[0] : null;
  //   form.setValue(name, file);

  //   if (onFileChange) {
  //     onFileChange(file);
  //   }
  // };

  const handleFileChange = (uploadedFiles: File[] | null) => {
    setFiles(uploadedFiles);
    const file =
      uploadedFiles && uploadedFiles.length > 0 ? uploadedFiles[0] : null;
    form.setValue(name, file);

    if (file) {
      // Create preview URL from the selected file
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      // Clear preview URL if no file is selected
      setPreviewUrl(null);
    }

    if (onFileChange) {
      onFileChange(file);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <FileUploader
              value={files}
              onValueChange={handleFileChange}
              dropzoneOptions={dropZoneConfig}
              className="relative bg-background rounded-lg p-1"
            >
              <FileInput
                id={`fileInput-${name}`}
                className="outline-dashed outline-1 outline-slate-500"
              >
                {previewUrl && (
                  // <img
                  //   src={previewUrl}
                  //   alt="Preview"
                  //   className="absolute top-0 left-0 w-full h-full object-cover z-10"
                  // />
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    layout="fill"
                    className="absolute top-0 left-0 object-cover z-10"
                  />
                )}
                <div className="flex items-center justify-center flex-col p-8 w-full">
                  <CloudUpload className="text-gray-500 w-10 h-10" />
                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                    &nbsp; or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (max 4MB)
                  </p>
                </div>
              </FileInput>
              <FileUploaderContent>
                {files &&
                  files.length > 0 &&
                  files.map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <Paperclip className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileUpload;
