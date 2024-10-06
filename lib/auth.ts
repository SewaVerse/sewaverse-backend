import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  //console.log("Session", session);
  //const user = { id: "66fd0611c7b14cc9f4633233" };
  //return user;
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  //return "SERVICE_PROVIDER";
  return session?.user?.role;
};
