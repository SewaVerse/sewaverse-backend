"use client";

import RegisterContext, { TRegisterData } from "@/app/context/RegisterContext";
import { useState } from "react";

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [registerData, setRegisterData] = useState<TRegisterData | null>(null);
  return (
    <RegisterContext value={{ registerData, setRegisterData }}>
      {children}
    </RegisterContext>
  );
}
