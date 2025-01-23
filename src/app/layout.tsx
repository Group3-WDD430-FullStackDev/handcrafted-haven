import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Common/Header";
import Nav from "@/components/Common/Nav";
import Footer from "@/components/Common/Footer";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Handcrafted Haven",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* placeholder code */}
        <Header />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
