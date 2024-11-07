"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState, useTransition } from "react";

function OtpLogin() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("+977");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  const requestOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    if (!recaptchaVerifier) {
      setError("RecaptchaVerifier not initialized. Please try again.");
      return;
    }

    try {
      // Request OTP with reCAPTCHA verifier
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setSuccess("OTP sent successfully.");
    } catch (err: any) {
      console.error("Error sending OTP:", err);
      setError(
        "Failed to send OTP. Please check the phone number or try again later."
      );
    }
  };

  const verifyOtp = async () => {
    setError(null);

    if (!confirmationResult) {
      setError("Please request OTP first.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      router.replace("/"); // Redirect after successful verification
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Failed to verify OTP. Please check the code.");
    }
  };

  return (
    <div>
      <h2>Phone Authentication</h2>
      <div id="recaptcha-container"></div>
      <form onSubmit={requestOtp}>
        <Input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button type="submit">Send OTP</Button>
      </form>
      {success && <p>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button onClick={verifyOtp}>Verify OTP</Button>
      </div>
    </div>
  );
}

export default OtpLogin;
