"use client";

import { MailIcon, PhoneIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSessionData } from "@/lib/sessionUtils";
import { capitalizeFirstLetter } from "@/lib/utils";

import ChangePassword from "./ChangePassword";
import EditUserProfile from "./EditUserProfile";

interface UserData {
  name: string;
  email: string;
  image: string;
  address: string;
  // status: string;
  phone: number;
}

interface MyProfileProps {
  userData: UserData;
}

const MyProfile = ({ userData }: MyProfileProps) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const sessionData = getSessionData(session);

  if (!sessionData) {
    return <p>No session data available. Please sign in.</p>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          My Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-2">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-primary">
            <AvatarImage src={userData.image} alt={sessionData.name} />
            <AvatarFallback>{sessionData.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <h2 className="text-2xl font-semibold">
          {capitalizeFirstLetter(sessionData.name)}
        </h2>

        <div className="flex flex-col items-center w-full max-w-md">
          <div className="flex items-center space-x-2">
            <PhoneIcon className="h-4 w-4 text-muted-foreground" />
            <span>{userData.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MailIcon className="h-4 w-4 text-muted-foreground" />
            <span>{sessionData.email}</span>
          </div>
          {/* <div className="flex items-center space-x-2 md:col-span-2">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
            <span>{userData.address}</span>
          </div> */}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-between md:flex-row gap-4 md:gap-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"brand"}>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] sm:h-auto md:max-h-[900px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                My Profile
              </DialogTitle>
            </DialogHeader>
            <EditUserProfile />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="brand">Change Password</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-center">
                Change Password
              </DialogTitle>
            </DialogHeader>
            <ChangePassword />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default MyProfile;
