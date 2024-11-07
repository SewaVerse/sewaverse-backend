const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false, // Set to true if you're using HTTPS
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_ACCESS_SECRET,
});

module.exports = minioClient;
