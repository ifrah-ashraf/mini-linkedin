import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import NavbarSwitch from "@/components/navbar/NavbarSwitch";

export const metadata: Metadata = {
  title: "linkedin",
  description: "A mini linkedin version",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <NavbarSwitch/>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
