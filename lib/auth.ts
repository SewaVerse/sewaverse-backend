import { auth } from "@/auth";

export const currentUser:any = async () => {
  const session = await auth();
  console.log("session:", session);
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
