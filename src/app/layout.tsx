import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BackToUp from "@/components/backToUp/BackToUp";

export const metadata: Metadata = {
  title: "Movienet",
  description: "movie and tv show website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <BackToUp />
      </body>
    </html>
  );
}
