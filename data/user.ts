import UserModel from "@/models/User";
import connectMongo from "@/lib/connectMongo";

export const getUserByEmail = async (email: string) => {
  try {
    await connectMongo();
    const user = await UserModel.findOne({ email });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectMongo();
    const user = await UserModel.findOne({ _id: id });
    return user;
  } catch {
    return null;
  }
};
