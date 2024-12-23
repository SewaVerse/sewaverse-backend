
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import { Button } from "./ui/button";

export function SignOut() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/"); // Redirect to the dashboard page after signing out
      toast.success("Signed out successfully!");
    });
  };
  return (
    <Button variant={"brand"} onClick={handleSignOut} type="submit">
      <LogOut />
      Sign Out
    </Button>
  );
}
