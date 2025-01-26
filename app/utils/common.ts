import bcrypt from "bcryptjs";

export async function hash(input: string) {
  return Promise.resolve(bcrypt.hashSync(input, 12));
}
