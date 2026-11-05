import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Shohojog - Community Events",
  description: "Discover, create and join social development events.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#FFF8ED] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
        <Providers>
          <Navbar />
          <main className="min-h-">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}