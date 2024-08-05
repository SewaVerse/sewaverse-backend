"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and handle successful login
        localStorage.setItem("token", data.tokenData); // Fixed property access
        console.log("Login successful:", data.message);
        router.push("/serviceproviders/dashboard"); // Ensure the route is correct
      } else {
        // Handle error
        console.error("Login failed:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <form className="flex flex-col items-center mt-4" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-black"
        />
        <label>Password</label>
        <input
          type="password" // Changed type to 'password' for security
          className="border-2 border-black"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="p-2 border-2 border-black rounded-lg mt-6"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
