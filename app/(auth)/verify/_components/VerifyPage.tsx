"use client";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const VerifyPageComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    try {
      if (!id || !token) {
        toast.error("Invalid verification link.");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        "/api/auth/verify",
        { id, token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success(`${response.data.message}`);
        router.push("/login");
      } else if (response.status === 404) {
        toast.error(`Invalid or expired link`);
      }
    } catch (error) {
      toast.error(`Invalid or expired link`);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/auth/resend-verification",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success(`${response.data.message}`);
      } else {
        toast.error(
          response.data.message || "Failed to resend verification link."
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-center font-heading font-bold text-3xl">
          Verify your email to continue
        </h1>
        <div className="text-center font-body text-xs font-medium text-slate-400">
          <p>We've sent a verification link to your email</p>
          <p>Please click the link in the email to verify your account</p>
        </div>

        <div className="flex font-body flex-col text-center">
          <Button
            className="mb-4"
            onClick={handleVerification}
            disabled={loading}
          >
            Verify
          </Button>
          <p className="font-medium text-slate-400 text-xs">
            Didn't receive an email?
          </p>
          <Button onClick={handleResend} disabled={loading}>
            Resend Email
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyPageComponent;
