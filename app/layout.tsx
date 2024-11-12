import { EdgeStoreProvider } from "@/lib/edgestore";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";

const pop = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

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
        <body className={pop.className}>
          <main>
            {" "}
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            <Toaster />
          </main>
        </body>
      </html>
    </SessionProvider>
  );
}
