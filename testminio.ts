// const Minio = require("minio");
// const minioClient = new Minio.Client({
//   endPoint: "127.0.0.1",
//   port: 9000,
//   useSSL: false,
//   accessKey: "minioadmin",
//   secretKey: "minioadmin",
// });

// // Example function to check if a bucket exists
// async function checkBucketExists(bucketName: string): Promise<boolean> {
//   try {
//     const exists = await minioClient.bucketExists(bucketName);
//     return exists;
//   } catch (err) {
//     console.error("Error checking bucket:", err);
//     throw err; // Re-throw the error if you want to handle it outside
//   }
// }

// // Example usage
// async function main() {
//   const bucketName = "sewaverse"; // Replace with your actual bucket name
//   try {
//     const exists = await checkBucketExists(bucketName);
//     console.log("Bucket exists:", exists);
//   } catch (err) {
//     console.log("Failed to check bucket existence:", err);
//   }
// }

// // Call the main function
// main();
