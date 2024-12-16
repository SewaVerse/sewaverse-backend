import { auth } from "@/auth";
import React from "react";

const Home = async () => {
  const session = await auth();
  return (
    <div className="text-center font-poppins font-medium text-xl">
      <h1>Id:{session?.user?.id}</h1>
      <h1>Name:{session?.user?.name}</h1>
      <h1>Email:{session?.user?.email}</h1>
      <h1>Role:{session?.user?.roles}</h1>
    </div>
  );
};

export default Home;
