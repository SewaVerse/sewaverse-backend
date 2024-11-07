"use client";
import * as z from "zod";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import Social from "@/components/social";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/settings";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    setError(""); // Reset error state

    const values = { email, password };

    // Validate form values against the schema
    const validation = LoginSchema.safeParse(values);
    if (!validation.success) {
      setError("Invalid input. Please check your email and password.");
      setLoading(false);
      return;
    }

    try {
      const result = await login(values, callbackUrl);

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirect the user upon successful login
        window.location.href = callbackUrl;
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col items-center mt-4" onSubmit={handleSubmit}>
        <label className="text-2xl font-medium">Email</label>
        <input
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-black rounded-md w-80 p-3"
          required
        />
        <label className="text-2xl font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black rounded-md w-80 p-3"
          required
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="py-2 px-8 border-2 border-black rounded-md bg-black text-white mt-6"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Social />
    </div>
  );
};

export default LoginPage;
