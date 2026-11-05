"use client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </ThemeProvider>
  );
}
