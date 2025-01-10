"use client";

import Link from "next/link";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface CongratulationsModalProps{
  openMessage: boolean,
  setOpenMessage: (open:boolean)=>void;
}

export default function CongratulationsModal({
   openMessage,
   setOpenMessage
}:CongratulationsModalProps) {
  console.log(openMessage);
  

  return (
    <Dialog open={openMessage} onOpenChange={setOpenMessage}>
      <DialogContent className="sm:max-w-[500px] border-[2px] rounded-lg">
        {/* Adding the DialogTitle */}
        <DialogTitle></DialogTitle>
        <div className="text-center space-y-4 py-4">
          <h2 className="text-2xl font-bold">Congratulations, Bishal!</h2>
          <div className="">
            <p className="text-base">Your profile is ready.</p>
            <p className="text-base">
              Please add at least one{" "}
              <Link
                href="/sewa"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Sewa
              </Link>{" "}
              to start connecting with customers.
            </p>
            <p className="text-base text-muted-foreground">
              Then, once your verification process is complete, your profile
              will be live.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
