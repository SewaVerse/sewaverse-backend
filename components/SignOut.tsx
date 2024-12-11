import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function SignOut() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/"); // Redirect to the dashboard page after signing out
    });
  };
  return (
    <Button onClick={handleSignOut} type="submit">
      Sign Out
    </Button>
  );
}
