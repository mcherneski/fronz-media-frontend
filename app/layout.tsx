import type { Metadata } from "next";
// import { Anek_Gurmukhi } from "next/font/google";
import "./globals.css";

// const Anek = Anek_Gurmukhi({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fronz Media",
  description: "An agency of creative alchemists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='font-proxima-nova-wide'>{children}</body>
    </html>
  );
}
