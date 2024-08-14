import UserModel from "@/models/User";
import connectMongo from "@/lib/connectMongo";

export const getUserByEmail = async (email: string) => {
  try {
    await connectMongo();
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error: any) {
    console.log("Error finding user by email", error);
    return null;
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectMongo();
    const user = await UserModel.findById(userId);
    return user;
  } catch (error: any) {
    console.error("Error finding user by ID:", error);
    return null;
  }
};
