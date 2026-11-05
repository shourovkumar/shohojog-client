"use client";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  useEffect(() => {
    const saved = localStorage.getItem("shohojog-theme") || "light";
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      {children}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </>
  );
}