//import { EdgeStoreProvider } from "@/lib/edgestore";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
// import { Inter } from "next/font/google";
import { Toaster } from "sonner";

// const pop = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sewaverse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        {/* <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        /> */}
        <body>
          <main>
            {children}
            {/* <EdgeStoreProvider></EdgeStoreProvider> */}
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
