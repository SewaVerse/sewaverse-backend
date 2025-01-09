"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import LoginForm from "../../(auth)/login/components/LoginForm";

const LoginModal = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const openChange = (value: boolean) => {
    if (!value) {
      return router.back();
    }
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Login</DialogTitle>
        </DialogHeader>
        <div className="md:px-10">
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
