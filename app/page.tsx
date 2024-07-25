"use client";

import OtpLogin from "@/components/OtpLogin";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-center">
      <h1 className="font-bold text-center mb-5">
        How to Add One-Time Password Phone Authentication
      </h1>

    <OtpLogin/>
    </main>
  );
}
