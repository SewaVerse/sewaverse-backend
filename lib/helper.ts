import axios from "axios";
import moment from "moment";

export function convertToSlug(name: string) {
  let modifiedName = name.trim(); // Remove leading and trailing whitespaces
  modifiedName = modifiedName.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove all special characters
  const splitedName = modifiedName.split(" ");
  const joinedName = splitedName.join("-").toLowerCase();
  return joinedName;
}

export async function uploadToMinIO(image: File, folder: string) {
  let uploadedFileName = "";
  const fileData = new FormData();
  fileData.append("file", image);
  fileData.append("uploadType", folder);
  try {
    const minoResponse = await axios.post("/api/uploadtominio", fileData);
    if (minoResponse.status === 201) {
      uploadedFileName = minoResponse.data[0];
    } else {
      console.log(minoResponse.data);
      console.log("Cannot upload file");
    }
  } catch (error) {
    console.error("File upload failed:", error);
  }
  return uploadedFileName;
}

export async function generateRandomPassword() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let randomString = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
}

export function convertToHumanReadable(params: any) {
  const formattedDate = moment(params).format("MMMM Do YYYY, h:mm:ss A");
  return formattedDate;
}
