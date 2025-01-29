import { Session } from "next-auth";

export interface SessionData {
  id: string;
  name: string;
  email: string;
//   userProfileId: string;
}

export const getSessionData = (session: Session | null): SessionData | null => {
  if (!session || !session.user) {
    return null;
  }

  return {
    id: session.user.id || "N/A",
    name: session.user.name || "N/A",
    email: session.user.email || "N/A",
    // userProfileId: session.user.userProfileId || "N/A",
  };
};
