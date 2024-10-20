import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  //console.log("Session", session);
  const user = { id: "67038b95ae6bd78826527043" };
  return user;
  //return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  return "USER";
  //return session?.user?.role;
};
