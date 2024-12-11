import type { Metadata } from "next";
import localFont from "next/font/local";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";

import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppinsFont = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sewaverse",
  description:
    "Book reliable pros for anything from plumbing to personal care, all in one easy platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${poppinsFont.variable} antialiased `}
      >
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-[100svh]">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ToasterContext />
        </SessionProvider>
      </body>
    </html>
  );
}
