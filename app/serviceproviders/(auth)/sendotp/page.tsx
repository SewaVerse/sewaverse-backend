"use client";
import React, { useState } from "react";

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Manually providing the userId
  const userId = "66a8a9786d5a7067f755774b"; // Replace with the actual userId you want to use

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("OTP verified successfully!");
        // Further actions after verification, like redirecting
      } else {
        setMessage(data.message || "OTP verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error submitting OTP:", error);
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <input
        className="border-2 border-black p-3 rounded-lg"
        type="text"
        value={otp}
        onChange={handleOtpChange}
        placeholder="Enter OTP"
        maxLength={6}
      />
      <button onClick={handleOtpSubmit}>Confirm OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
