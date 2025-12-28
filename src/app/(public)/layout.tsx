import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      id="public-layout"
      className="flex flex-col min-h-screen relative"
      suppressHydrationWarning
    >
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
