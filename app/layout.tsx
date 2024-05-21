import type { Metadata } from "next"
// import { Anek_Gurmukhi } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/custom/footer"
import { Montserrat } from 'next/font/google'
import { HeaderBar } from "@/components/custom/header-bar"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from 'react'

const montserrat = Montserrat({ subsets: ["latin"] })
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
      <body className={`${montserrat.className} relative font-proxima-nova-wide h-screen w-screen bg-fronz-gradient-2`}>
        <HeaderBar />
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>

        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
