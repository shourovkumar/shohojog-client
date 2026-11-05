import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "Shohojog - Social Development Events",
  description: "Join and create social development events in your community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 👇 FIX 1: body teo suppressHydrationWarning */}
      <body
        suppressHydrationWarning
        className="bg-[#FFF8ED] dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <Providers>
          {/* 👇 FIX 2: h- -> h- */}
          <Suspense fallback={<div className="h-" />}>
            <Navbar />
          </Suspense>
          <main className="min-h-screen">
            <Suspense fallback={<div className="text-center py-16">Loading...</div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}