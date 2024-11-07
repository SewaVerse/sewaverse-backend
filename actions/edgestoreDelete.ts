"use server";

import { backendClient } from "@/app/api/edgestore/[...edgestore]/route";


export const deleteFileFromEdgeStore = async (fileUrl: string) => {
  try {
    
    const res = await backendClient.publicFiles.deleteFile({
      url: fileUrl,
    });

    // Check the response
    if (res.success) {
      console.log(`File deleted from EdgeStore:`);
    } else {
      console.log(`Failed to delete file:`);
    }
  } catch (error) {
    console.error("Error deleting file from EdgeStore:", error);
    throw new Error("Error deleting file from EdgeStore");
  }
};
