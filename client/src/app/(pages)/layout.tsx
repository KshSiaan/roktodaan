import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-full h-[96px]"></div>
      {children}
      <Toaster />
      <Footer />
    </>
  );
}
