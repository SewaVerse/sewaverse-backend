import Image from "next/image";
import { Button } from "@/components/ui/button";
import EmailVerified from "./emailverified";



export default function EmailVerification() {

    
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <Image src="/images/mainLogo.svg" alt="logo" width={40} height={40} />
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <Image
              src="/images/profile.svg"
              alt="logo"
              width={30}
              height={30}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center w-full px-4">
        <div className="text-center">
          {/* Illustration */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/email.svg"
              alt="logo"
              width={300}
              height={300}
            />
          </div>

          {/* Message */}
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            Verify your email to continue
          </h1>
          <p className="text-gray-500 text-sm">
            We’ve just sent an email to{" "}
            <span className="font-semibold">testemail@gmail.com</span>. <br />
            Please check your inbox and click the link provided to verify your
            email address.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <Button variant={"brand"} className="mt-2 w-full">
              Resend Email
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 transition"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </main>
    </div>

);
}
