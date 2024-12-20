"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function sewaproviderWelcome() {
  const session = useSession();
  const userName =
  session?.data?.user?.name;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Top Navigation */}

      {/* Main Content */}
      <main className="flex flex-col items-center text-center px-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Welcome <span className="text-purple-600">{userName}</span>, Ready to take
          your business <br /> to the next{" "}
          <span className="underline decoration-red-500">level</span>??
        </h1>

        {/* Instructions */}
        <div className="space-y-6 my-8 text-gray-600">
          <div className="flex items-center space-x-3">
                      <Image src="/images/userquestion.svg" alt="logo" width={40} height={40} />
            
            <p>
              Fill in your details to create your personalized business page.
            </p>
          </div>
          <div className="flex items-center space-x-3">
          <Image src="/images/lovegesture.svg" alt="logo" width={40} height={40} />

            <p>List the services and get connected with the right clients.</p>
          </div>
          <div className="flex items-center space-x-3">
          <Image src="/images/money.svg" alt="logo" width={40} height={40} />

            <p>Share your expertise to build trust and credibility.</p>
          </div>
        </div>

        <Link href="/sewaprovider" >
  <Button
    variant={"brand"}
    className="mt-2 px-4 py-2 text-sm text-white bg-[#2E3192] hover:bg-[#2A2E91]"
  >
    Get Started
  </Button>
</Link>

        {/* Footer */}
        <p className="mt-4 text-sm text-gray-400">
          It only takes a few minutes to set up your profile and start receiving
          bookings.
        </p>
      </main>
    </div>
  );
}
