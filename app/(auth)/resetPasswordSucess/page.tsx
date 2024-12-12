import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordSuccess() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md  p-6 rounded-lg">
        <div className="flex justify-center mb-2">
          <Image src="/images/mainLogo.svg" alt="logo" width={50} height={50} />
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Password Reset Successful
        </h3>

        <p className="font-Poppins text-[14px] font-normal text-[#878787] leading-[21px] text-center  decoration-skip-ink-auto">
          Your password has been successfully reset.
          <br /> Click below to log in.
        </p>

        <Button variant="brand" className="mt-2 w-full">
          <Link href="/login" className="w-full block text-center">
            Continue
          </Link>
        </Button>
      </div>
    </div>
  );
}
