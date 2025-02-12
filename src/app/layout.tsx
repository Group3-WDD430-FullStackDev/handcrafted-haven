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
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
