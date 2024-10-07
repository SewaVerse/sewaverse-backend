import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  //console.log("Session", session);
  // const user = { id: "67036e63ae558d01860c125d" };
  // return user;
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  return "SERVICE_PROVIDER";
  //return session?.user?.role;
};
