import Footer from "@/components/footer";
import Header from "@/components/header";

export default async function HeroLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      {modal}
    </>
  );
}
