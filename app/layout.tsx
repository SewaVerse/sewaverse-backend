import "./globals.css";
import { Poppins } from "next/font/google";
//import SessionWrapper from "@/utils/SessionWrapper";

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
    // <SessionWrapper>
    <html lang="en">
      <body className={pop.className}>
        <main>{children}</main>
      </body>
    </html>
    // </SessionWrapper>
  );
}
