// src/hooks/useAuth.ts
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(status === "loading");

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session?.user);
      setRole(session?.user?.role || null);
      setLoading(false);
    } else if (status === "unauthenticated") {
      setUser(null);
      setRole(null);
      setLoading(false);
    }
  }, [session, status]);

  return { user, role, loading };
};
