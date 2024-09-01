import mongoose from "mongoose";

let isConnected: boolean = false;

const connectMongo = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    mongoose.set("strictQuery", false);

    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL!);
    const connection = mongoose.connection;

    // Set maximum number of listeners
    connection.setMaxListeners(5); // Adjust the number as needed

    // Handle MaxListenersExceededWarning
    process.on("warning", (warning) => {
      if (warning.name === "MaxListenersExceededWarning") {
        console.error("Max Listners Exceeded");
        // Add additional logging or debugging information here
      }
    });

    // Event handlers for connection status
    connection.on("connected", () => {
      isConnected = true;
      console.log("MongoDB Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB Connection Error: " + err);
      process.exit(1); // Exit the process on connection error
    });
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connectMongo;
