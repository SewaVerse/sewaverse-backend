import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  console.log("Uploading Document");
  const data = await request.formData();
  let uploadType: string | null = data.get("uploadType") as string | null;

  const fileEntries: FormDataEntryValue[] = data.getAll(
    "file"
  ) as FormDataEntryValue[];

  if (!fileEntries || !uploadType) {
    return NextResponse.json({ success: false });
  }

  const files: File[] = fileEntries.map((entry) => entry as File);

  try {
    const uploadedFileNames: string[] = [];

    // Process and store each file individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueId = Date.now().toString();
      const fileExtension = path.extname(file.name).slice(1);
      const filename = `${uploadType}_${uniqueId}_${i}.${fileExtension}`;

      // Use forward slashes in the object name
      const objectName = `${uploadType}/${filename}`; // Change to use '/' instead of path.join

      const contentType = file.type;
      await minioClient.putObject(
        BUCKET_NAME,
        objectName,
        buffer,
        buffer.length,
        {
          "Content-Type": contentType,
        }
      );

      console.log(`File uploaded to MinIO: ${objectName}`);
      uploadedFileNames.push(objectName);
    }

    return new NextResponse(JSON.stringify(uploadedFileNames), { status: 201 });
  } catch (error) {
    console.error("Error uploading file(s) to MinIO:", error);
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }
}
