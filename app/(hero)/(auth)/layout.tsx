import ImageContainer from "@/components/ImageContainer";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ImageContainer>{children}</ImageContainer>;
}
