// import { NextResponse } from "next/server";
// import { createFile } from "@/app/data-access/file";
// import { providerVerificationTwo } from "@/app/schemas/providerVerificationTwo";
// import { fileSchema } from "@/app/schemas/fileSchema";
// import { validateRequestBody } from "@/app/utils/validateRequestBody";
// import { createServiceProviderProfile } from "@/app/data-access/serviceProviderProfile";
// import { File as PrismaFile } from "@prisma/client";
// import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";

// export const POST = roleAsyncHandler(
//   "SERVICE_PROVIDER",
//   async (request: Request) => {
//     const formData = await request.formData();

//     const inputFile = formData.get("file") as File;
//     const profession = formData.get("profession") as string;
//     const skills = formData.get("skills") as string;
//     const serviceSubCategory = formData.getAll(
//       "serviceSubCategory"
//     ) as string[];
//     const serviceProviderId = formData.get("serviceProviderId") as string;

//     const [validationError, validatedFields] = validateRequestBody(
//       providerVerificationTwo,
//       {
//         profession,
//         skills,
//         serviceSubCategory,
//         serviceProviderId,
//       }
//     );

//     if (validationError) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Validation failed",
//           errors: validationError,
//         },
//         { status: 400 }
//       );
//     }

//     const [fileValidationError] = validateRequestBody(fileSchema, {
//       file: inputFile,
//     });

//     if (fileValidationError) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "File validation failed",
//           errors: fileValidationError,
//         },
//         { status: 400 }
//       );
//     }

//     const {
//       profession: validatedProfession,
//       skills: validatedSkills,
//       serviceSubCategory: validatedSubCategories,
//       serviceProviderId: validatedServiceProviderId,
//     } = validatedFields;

//     let imageId: string | null = null;

//     const file = inputFile;

//     if (file) {
//       const fileBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(fileBuffer);

//       const savedFile = await createFile(
//         {
//           name: file.name,
//           size: file.size,
//           type: file.type,
//         } as PrismaFile,
//         buffer
//       );
//       imageId = savedFile.id;
//     }

//     await createServiceProviderProfile({
//       profession: validatedProfession,
//       skills: validatedSkills,
//       serviceSubCategory: validatedSubCategories,
//       serviceProviderId: validatedServiceProviderId,
//       imageId: imageId,
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Service provider profile created successfully",
//       },
//       { status: 201 }
//     );
//   }
// );

import { NextResponse } from "next/server";
import { updateServiceProviderProfile } from "@/app/data-access/serviceProvider";
import { providerVerificationTwo } from "@/app/schemas/providerVerificationTwo";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { validateRequestBody } from "@/app/utils/validateRequestBody";
import { currentUser } from "@/lib/auth";
import { getServiceProviderByUserId } from "@/app/data-access/serviceProvider";
import { imageUpload } from "@/app/utils/imageUpload";

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    // Parse the request body
    const formData = await request.formData();

    // Upload the file and get the file ID
    const imageId = await imageUpload(formData);

    // Extract fields from formData
    const profession = formData.get("profession") as string;
    const skills = formData.get("skills") as string;
    const description = formData.get("description") as string;
    const serviceSubCategory =
      (formData.get("serviceSubCategory") as string)?.split(",") || [];

    // Create a validated object from the extracted fields
    const validatedFields = {
      profession,
      skills,
      description,
      serviceSubCategory,
      imageId,
    };

    // Validate the extracted fields against the schema
    const [validationError, validated] = validateRequestBody(
      providerVerificationTwo,
      validatedFields
    );
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    // Get the current user
    const user = await currentUser();

    // Fetch the service provider profile for the user
    const profile = await getServiceProviderByUserId(user!.id!);

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found for the service provider" },
        { status: 404 }
      );
    }

    // Update the profile with the new data
    await updateServiceProviderProfile(profile.id, {
      profession: validated.profession,
      skills: validated.skills,
      description: validated.description,
      imageId: imageId,
      serviceSubCategory: validated.serviceSubCategory,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  }
);
