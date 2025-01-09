"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type EmailVerificationResponse = {
  success: boolean;
  message: string;
};

const DynamicResponse = ({ data }: { data: EmailVerificationResponse }) => {
  const [seconds, setSeconds] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (data.success) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      if (seconds === 0) {
        clearInterval(interval);
        router.push("/login"); // Redirect to login page
      }

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [seconds, data.success, router]);

  return (
    <>
      <h1 className="text-xl font-semibold text-gray-800">{data.message}</h1>
      {data.success && (
        <p className="text-gray-500 text-sm">
          Redirecting you to the login page in {seconds} second
          {seconds !== 1 ? "s" : ""}...
        </p>
      )}
    </>
  );
};

export default function EmailVerification() {
  const { slug } = useParams();
  const [data, setData] = useState<EmailVerificationResponse | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: slug }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [slug]);

  return (
    <main className="flex flex-1 flex-col  w-full p-4 md:min-h-[80svh]">
      <div className="text-center">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <Image src="/images/email.svg" alt="logo" width={300} height={300} />
        </div>

        {/* Message */}
        {isLoading && (
          <h1 className="text-xl font-semibold text-gray-800">
            Verifying your email...
          </h1>
        )}
        {!isLoading && data && <DynamicResponse data={data} />}
      </div>
    </main>
  );
}
