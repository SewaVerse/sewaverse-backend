import bcrypt from "bcryptjs";

export async function hash(input: string) {
  return await bcrypt.hash(input, 12);
}
