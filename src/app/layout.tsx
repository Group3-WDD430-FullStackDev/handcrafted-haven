import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Common/SessionProvider";
import Header from "@/components/Common/Header";
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
        <Providers>
          <Header />
          <hr className="mx-4 border-gray-600" />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
