"use client";

import { useSession } from "next-auth/react";

import { getSessionData } from "@/lib/sessionUtils";

const SessionDataDisplay = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading session data...</p>;
  }

  // Get session data using the utility function
  const sessionData = getSessionData(session);

  if (!sessionData) {
    return <p>No session data available. Please sign in.</p>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Session Data</h2>
      <div className="text-sm bg-gray-100 p-3 rounded">
        {/* <>UserProfile Id:{sessionData.userProfileId}</> */}
        <p>
          <strong>ID:</strong> {sessionData.id}
        </p>
        <p>
          <strong>Name:</strong> {sessionData.name}
        </p>
        <p>
          <strong>Email:</strong> {sessionData.email}
        </p>
      </div>
    </div>
  );
};

export default SessionDataDisplay;
