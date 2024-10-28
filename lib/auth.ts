import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  //console.log("Session", session);
  // const user = { id: "6718e3e6a8a5f98f1f67f9cf" };
  // return user;
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  // return "SERVICE_PROVIDER";
  return session?.user?.role;
};

