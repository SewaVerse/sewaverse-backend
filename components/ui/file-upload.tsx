// "use client";

// import { CloudUpload } from "lucide-react";
// import React, { useState } from "react";
// import { toast } from "sonner";
// import Image from "next/image";

// const UploadImageCard = () => {
//   const [images, setImages] = useState<string[]>([]); // Store multiple images

//   // Function to handle image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []); // Convert file list to array

//     // Filter valid image files
//     const validImages = files.filter(
//       (file) =>
//         file.type === "image/jpeg" ||
//         file.type === "image/png" ||
//         file.type === "image/jpg"
//     );

//     if (validImages.length === 0) {
//       toast.error("Please upload valid image files (JPG, JPEG, PNG).");
//       return;
//     }

//     if (images.length + validImages.length > 3) {
//       toast.error("You can only upload a maximum of 3 images.");
//       return;
//     }

//     const newImages: string[] = [];

//     validImages.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (typeof reader.result === "string") {
//           newImages.push(reader.result);

//           // Once all images are processed, update state
//           if (newImages.length === validImages.length) {
//             setImages((prevImages) => [...prevImages, ...newImages]);
//           }
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index: number) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   return (
//     <div>
//       {images.length < 3 && (
//         <div className="border-dashed border-2 border-gray-300 h-40 rounded-xl flex flex-row items-center justify-center">
//           <>
//             <CloudUpload className="w-12 h-12 text-gray-500" />
//             <input
//               type="file"
//               accept="image/jpeg, image/png, image/jpg"
//               onChange={handleImageUpload}
//               className="hidden"
//               id="uploadImages"
//               multiple // Allow multiple file selection
//             />
//             <label
//               htmlFor="uploadImages"
//               className="cursor-pointer text-gray-500 font-normal flex flex-col items-center"
//             >
//               Drop or click to upload images
//               <div className="text-center text-sm font-normal text-gray-400">
//                 <p>Allowed *.jpeg, *.jpg, *.png</p>
//                 <p>Max size of 1 Mb per file</p>
//                 <p>Max 3 images</p>
//               </div>
//             </label>
//           </>
//         </div>
//       )}

//       {/* Display Uploaded Images */}
//       <div className="flex gap-4 flex-wrap">
//         {images.map((image, index) => (
//           <div key={index} className="relative">
//             <Image
//               src={image}
//               alt={`Uploaded ${index + 1}`}
//               className="rounded-lg w-32 h-24 object-cover"
//               height={24}
//               width={32}
//             />
//             <button
//               onClick={() => removeImage(index)}
//               className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
//             >
//               &times;
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UploadImageCard;
