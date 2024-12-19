"use client";

import { createContext } from "react";

export type TRegisterData = {
  accountType: string;
  role: string;
};

type RegisterContextType = {
  registerData: TRegisterData | null;
  setRegisterData: React.Dispatch<React.SetStateAction<TRegisterData | null>>;
};

const RegisterContext = createContext<RegisterContextType | null>(null);

export default RegisterContext;
