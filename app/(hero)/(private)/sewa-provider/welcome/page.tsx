import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { currentNextAuthUser } from "@/lib/auth";

export default async function SewaProviderWelcomePage() {
  const user = await currentNextAuthUser();
  return (
    <div className="flex flex-col items-center justify-center p-10 my-10 bg-gray-50 h-full rounded-md">
      {/* Top Navigation */}

      {/* Main Content */}
      <div className="flex flex-col items-center text-center px-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 my-4">
          Welcome{" "}
          <span className="gradient-text capitalize font-bold">
            {user?.name}
          </span>
          , Ready to take your business <br /> to the next <span>level</span> ??
        </h1>

        {/* Instructions */}
        <div className="md:space-y-10 my-8 text-gray-600">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/userquestion.svg"
              alt="logo"
              width={40}
              height={40}
            />

            <p>
              Fill in your details to create your personalized business page.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Image
              src="/images/lovegesture.svg"
              alt="logo"
              width={40}
              height={40}
            />

            <p>List the services and get connected with the right clients.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Image src="/images/money.svg" alt="logo" width={40} height={40} />

            <p>Share your expertise to build trust and credibility.</p>
          </div>
        </div>

        <Link href="/sewa-provider/verification">
          <Button variant={"brand"} className="px-10">
            Get Started
          </Button>
        </Link>

        {/* Footer */}
        <p className="mt-4 text-sm text-gray-400">
          It only takes a few minutes to set up your profile and start receiving
          bookings.
        </p>
      </div>
    </div>
  );
}
