import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error: any) {
    console.error("Error hashnig password", error);
    return null;
  }
};
