// "use client";

// // import { zodResolver } from "@hookform/resolvers/zod";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// // import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { District, Municipality, StateProvince } from "@prisma/client";
// import Image from "next/image";
// import toast from "react-hot-toast";

// import {
//   ProviderVerificationDetail,
//   providerVerificationDetailSchema,
// } from "@/app/schemas/providerVerification";
// import FileUpload from "@/components/form/FileUpload";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // interface SewaProviderDetailsFormData {
// //   gender: string;
// //   dateOfBirth: string;
// //   provinceId: string;
// //   districtId: string;
// //   municipalityId: string;
// //   wardNo: string;
// //   tole: string;
// //   citizenshipFront: string;
// //   citizenshipBack: string;
// //   panNumber: string;
// //   panCard: string;
// //   verificationDocument1: {
// //     documentType: string;
// //     documentNumber: string | null;
// //   };
// //   verificationDocument2: {
// //     documentType: string;
// //     documentNumber: string | number;
// //   };
// // }

// interface Option {
//   value: string;
//   label: string;
// }

// interface MunicipalityOption extends Option {
//   wards: Option[];
// }

// interface PreviewImage {
//   url: string;
//   name: string;
// }

// // const formSchema = z.object({
// //   gender: genderSchema,
// //   dateOfBirth: dobSchema,
// //   address: addressSchema,
// // });

// export default function SewaProviderDetails() {
//   const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
//   const [provinceOptions, setProvinceOptions] = useState<Option[]>([]);
//   const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
//   const [municipalityOptions, setMunicipalityOptions] = useState<
//     MunicipalityOption[]
//   >([]);
//   const [wardOptions, setWardOptions] = useState<Option[]>([]);

//   const form = useForm<ProviderVerificationDetail>({
//     resolver: zodResolver(providerVerificationDetailSchema),
//     defaultValues: {
//       gender: "",
//       dob: "",
//       address: {
//         provinceId: "",
//         districtId: "",
//         municipalityId: "",
//         wardNo: 0,
//         tole: "",
//       },
//       verificationDocument1: {
//         documentType: "",
//         documentNumber: "",
//         frontFile: undefined,
//         backFile: undefined,
//       },
//       verificationDocument2: {
//         documentType: "pan_vat",
//         documentNumber: "",
//         frontFile: undefined,
//       },
//     },
//   });

//   const onSubmit = async (data: ProviderVerificationDetail) => {
//     try {
//       const formData = new FormData();

//       // Construct JSON payload
//       const jsonPayload = {
//         gender: data.gender,
//         dob: data.dob,
//         address: data.address,
//         verificationDocument1: {
//           documentType: data.verificationDocument1.documentType,
//           documentNumber: data.verificationDocument1.documentNumber,
//         },

//         verificationDocument2: {
//           documentType: data.verificationDocument2.documentType,
//           documentNumber: data.verificationDocument2.documentNumber,
//         },
//       };

//       // Add JSON payload to FormData
//       formData.append("json", JSON.stringify(jsonPayload));

//       if (data.verificationDocument1.frontFile?.file) {
//         console.warn(
//           "Front File 1:",
//           data.verificationDocument1.frontFile.file
//         );
//         formData.append(
//           "document1.frontFile",
//           data.verificationDocument1.frontFile.file
//         );
//       }
//       if (data.verificationDocument1.backFile?.file) {
//         console.warn("Back File 1:", data.verificationDocument1.backFile.file);
//         formData.append(
//           "document1.backFile",
//           data.verificationDocument1.backFile.file
//         );
//       }
//       if (data.verificationDocument2.frontFile?.file) {
//         console.warn(
//           "Front File 2:",
//           data.verificationDocument2.frontFile.file
//         );
//         formData.append(
//           "document2.frontFile",
//           data.verificationDocument2.frontFile.file
//         );
//       }
//       if (data.verificationDocument2.backFile?.file) {
//         console.warn("Back File 2:", data.verificationDocument2.backFile.file);
//         formData.append(
//           "document2.backFile",
//           data.verificationDocument2.backFile.file
//         );
//       }

//       // warn the FormData (note: FormData can't be directly console.warnged)
//       for (const pair of formData.entries()) {
//         console.warn(pair[0], pair[1]);
//       }

//       // console.warn("Form data submitted successfully:", jsonPayload);

//       const response = await fetch(
//         "/api/service-provider/verification/detail",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Failed to submit form");
//       }
//       await response.json();
//       toast({
//         title: "Success",
//         // description: result.message,
//       });
//     } catch (error) {
//       // console.error("Error submitting form:", error);
//       toast({
//         title: "Error",
//         description:
//           error instanceof Error ? error.message : "Failed to submit form",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleFileChange = (fieldName: string, file: File | null) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const result = reader.result as string;
//         setPreviewImages((prev) => {
//           // Remove existing preview for this field if it exists
//           const filtered = prev.filter((p) => p.name !== fieldName);
//           return [...filtered, { url: result, name: fieldName }];
//         });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewImages((prev) => prev.filter((p) => p.name !== fieldName));
//     }
//   };

//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const response = await fetch("/api/state-province");
//         const data = await response.json();
//         setProvinceOptions(
//           data.data.map((province: StateProvince) => ({
//             value: province.id,
//             label: province.name,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching provinces:", error);
//       }
//     };
//     fetchProvinces();
//   }, []);

//   const handleProvinceChange = async (value: string) => {
//     form.setValue("address.districtId", "");
//     form.setValue("address.municipalityId", "");
//     form.setValue("address.wardNo", 0);
//     try {
//       const response = await fetch(`/api/district?provinceId=${value}`);
//       const data = await response.json();
//       setDistrictOptions(
//         data.data.map((district: District) => ({
//           value: district.id,
//           label: district.name,
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//     }
//   };

//   const handleDistrictChange = async (value: string) => {
//     form.setValue("address.municipalityId", "");
//     form.setValue("address.wardNo", 0);
//     try {
//       const response = await fetch(`/api/municipality?districtId=${value}`);
//       const data = await response.json();
//       const municipalities = data.data.map((municipality: Municipality) => ({
//         value: municipality.id,
//         label: municipality.name,
//         wards: municipality.wards.map((ward: number) => ({
//           value: ward.toString(),
//           label: ward.toString(),
//         })),
//       }));
//       setMunicipalityOptions(municipalities);
//     } catch (error) {
//       console.error("Error fetching municipalities:", error);
//     }
//   };

//   const handleMunicipalityChange = (value: string) => {
//     form.setValue("address.wardNo", 0);
//     const municipality = municipalityOptions.find((m) => m.value === value);
//     setWardOptions(municipality?.wards ?? []);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-10">
//         <div className="bg-white rounded-lg shadow-lg p-6 w-full md:max-w-lg">
//           <h2 className="text-center text-2xl font-semibold mb-4">
//             Sewa Provider Details
//           </h2>

//           <div className="flex justify-between items-center text-lg text-gray-400 font-medium mb-2">
//             <p>Individual</p>
//             <p>Step 1/3</p>
//           </div>
//           <div className="w-full h-[3px] bg-brand-gradient mb-4"></div>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="gender"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Gender</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select gender" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="male">Male</SelectItem>
//                           <SelectItem value="female">Female</SelectItem>
//                           <SelectItem value="others">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="dob"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Date of Birth</FormLabel>
//                       <FormControl>
//                         <Input type="date" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-md font-medium">Address</h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="address.provinceId"
//                     render={({ field }) => (
//                       <FormItem>
//                         <Select
//                           onValueChange={(value) => {
//                             field.onChange(value);
//                             handleProvinceChange(value);
//                           }}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select Province" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {provinceOptions.map((option) => (
//                               <SelectItem
//                                 key={option.value}
//                                 value={option.value}
//                               >
//                                 {option.label}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="address.districtId"
//                     render={({ field }) => (
//                       <FormItem>
//                         <Select
//                           onValueChange={(value) => {
//                             field.onChange(value);
//                             handleDistrictChange(value);
//                           }}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select District" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {districtOptions.map((option) => (
//                               <SelectItem
//                                 key={option.value}
//                                 value={option.value}
//                               >
//                                 {option.label}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="address.municipalityId"
//                     render={({ field }) => (
//                       <FormItem>
//                         <Select
//                           onValueChange={(value) => {
//                             field.onChange(value);
//                             handleMunicipalityChange(value);
//                           }}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select Municipality" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {municipalityOptions.map((option) => (
//                               <SelectItem
//                                 key={option.value}
//                                 value={option.value}
//                               >
//                                 {option.label}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="address.wardNo"
//                     render={({ field }) => (
//                       <FormItem>
//                         {/* <FormLabel>Ward No</FormLabel> */}
//                         <Select
//                           onValueChange={(value) => {
//                             field.onChange(parseInt(value, 10));
//                           }}
//                           // value={field.value?.toString()} // Convert number to string for display
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select Ward" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {wardOptions.map((option) => (
//                               <SelectItem
//                                 key={option.value}
//                                 value={option.value}
//                               >
//                                 {option.label}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="address.tole"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input placeholder="Tole" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-lg font-medium">
//                     Verification Documents
//                   </h3>
//                   <p className="text-base gradient-text">Personal Documents</p>
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="verificationDocument1.documentType"
//                   render={({ field }) => (
//                     <FormItem>
//                       <Select onValueChange={field.onChange}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select Citizenship" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="citizenship">
//                             Citizenship
//                           </SelectItem>
//                           <SelectItem value="nationalcard">
//                             National Identity Card
//                           </SelectItem>
//                           <SelectItem value="drivinglicense">
//                             Driver&apos;s License
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <FormField
//                     control={form.control}
//                     name="verificationDocument1.frontFile.file"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Front Side</FormLabel>
//                         <FileUpload
//                           form={form}
//                           name="verificationDocument1.frontFile.file"
//                           onFileChange={(file) => {
//                             field.onChange(file);
//                             handleFileChange("Front Side", file);
//                           }}
//                         />
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div>
//                   <FormField
//                     control={form.control}
//                     name="verificationDocument1.backFile.file"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Back Side</FormLabel>
//                         <FileUpload
//                           form={form}
//                           name="verificationDocument1.backFile.file"
//                           onFileChange={(file) => {
//                             field.onChange(file);
//                             handleFileChange("Back Side", file);
//                           }}
//                         />
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//               {/* PAN Card section */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="verificationDocument2.documentNumber" // Correctly using nested property
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>PAN Number</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div>
//                   <FormField
//                     control={form.control}
//                     name="verificationDocument2.frontFile.file"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Back Side</FormLabel>
//                         <FileUpload
//                           form={form}
//                           name="verificationDocument2.frontFile.file"
//                           onFileChange={(file) => {
//                             field.onChange(file);
//                             handleFileChange("Front Side", file);
//                           }}
//                         />
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 variant={"brand"}
//                 className="w-full mt-6"
//                 // disabled={
//                 //   !form.formState.isValid || form.formState.isSubmitting
//                 // }
//               >
//                 {form.formState.isSubmitting ? "Submitting..." : "Proceed"}
//               </Button>
//             </form>
//           </Form>
//         </div>

//         {/* Preview Section */}
//         <div className="w-3/4">
//           <h1 className="block mb-2 text-xl font-semibold text-center">
//             Preview of Document
//           </h1>
//           <div className="border-[2px] border-dashed border-black h-[66.5rem] flex flex-col items-center justify-center p-4 overflow-y-auto">
//             {previewImages.length > 0 ? (
//               previewImages.map((image, index) => (
//                 <div key={index} className="mb-6 last:mb-0">
//                   <Image
//                     src={image.url}
//                     alt={image.name}
//                     height={400}
//                     width={500}
//                     // objectFit="contain"
//                     className="object-contain mb-2"
//                   />
//                   <p className="text-sm text-center text-gray-600">
//                     {image.name}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No documents uploaded</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
