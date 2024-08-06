"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/serviceproviders/dashboard");
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
        />
        <label className="text-2xl font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black rounded-md w-80 p-3"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="py-2 px-8 border-2 border-black rounded-md bg-black text-white mt-6"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
