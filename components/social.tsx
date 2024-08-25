"use client";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full px-4 gap-x-2">
      <button
        className="w-auto bg-black text-white rounded-lg p-3"
        onClick={() => onClick("google")}
      >
        Google{" "}
      </button>
    
    </div>
  );
};

export default Social;
