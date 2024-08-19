"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (session && session.user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/user/${session.user.id}`);
          const data = await response.json();
          setUserDetails(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session)
    return (
      <div className="font-bold text-center text-2xl">Please log in first</div>
    );

  return (
    <div className="flex flex-col items-center text-xl font-bold">
      <h1>{session.user?.name}'s Dashboard</h1>
      <h1>User id {session.user?.id}</h1>
      <h1>Welcome {session.user?.email}</h1>
      <p>Role: {session.user?.role}</p>

      <button
        className="border-none rounded-md bg-black text-white font-normal px-4 py-2"
        onClick={() => signOut({ callbackUrl: "/serviceproviders/login" })}
      >
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
