import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter, Roboto, Work_Sans } from "next/font/google";

import { auth } from "@/auth";

import TanStackContext from "./context/TanStackContext";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";

const Work_SansFont = Work_Sans({
  subsets: ["latin"],
  variable: "--work-sans",
});
const robotoFont = Roboto({
  subsets: ["latin"],
  variable: "--roboto",
  weight: ["400", "500", "700"],
});
const interFont = Inter({
  subsets: ["latin"],
  variable: "--inter",
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
        // className={`${geistSans.variable} ${geistMono.variable}  ${poppinsFont.variable} antialiased `}
        className={`${Work_SansFont.variable} ${robotoFont.variable} ${interFont.variable} antialiased `}
      >
        <SessionProvider session={session}>
          <TanStackContext>
            <div className="flex flex-col md:min-h-[100svh]">{children}</div>
            <ToasterContext />
          </TanStackContext>
        </SessionProvider>
      </body>
    </html>
  );
}
