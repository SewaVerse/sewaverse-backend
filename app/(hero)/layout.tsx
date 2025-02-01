"use client";
import { useSession } from "next-auth/react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import ServiceProviderHeader from "@/components/header/service-provider-header";

export default function HeroLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const { data: session } = useSession();
  return (
    <>
      {session?.user?.roles.includes("SERVICE_PROVIDER") ? (
        <ServiceProviderHeader />
      ) : (
        <Header />
      )}
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      {modal}
    </>
  );
}
