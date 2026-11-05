"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { signOut, useSession } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import toast from "react-hot-toast";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  async function handleLogout() {
    await signOut();
    clearToken();
    toast.success("Logged out successfully");
    setDrop(false);
    setOpen(false);
    router.push("/");
  }

  const linkCls = (href) =>
    pathname === href
      ? "text-teal-700 dark:text-teal-400 font-bold"
      : "text-slate-600 dark:text-slate-300 hover:text-teal-700 font-medium";

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8ED]/95 dark:bg-slate-950/95 backdrop-blur border-b border-amber-100 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 h- flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-10 h-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center text-xl font-black">S</span>
          <span className="text-xl md:text-2xl font-black tracking-tight">Shoho<span className="text-amber-500">jog</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link href="/" className={linkCls("/")}>Home</Link>
          <Link href="/upcoming" className={linkCls("/upcoming")}>Upcoming Events</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-9 h-9 rounded-full bg-amber-100 dark:bg-slate-800 flex items-center justify-center text-lg" aria-label="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {!user ? (
            <Link href="/login" className="hidden sm:inline-block bg-teal-700 hover:bg-teal-800 text-white font-bold px-5 py-2.5 rounded-full text-sm">Login</Link>
          ) : (
            <div className="relative">
              <button onClick={() => setDrop(!drop)} className="flex items-center gap-2" title={user.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=0F3D3E&color=fff`} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-amber-400" />
                <span className="hidden lg:block text-sm font-bold max-w- truncate">{user.name}</span>
                <span className="text-xs">▼</span>
              </button>
              {drop && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-amber-100 dark:border-slate-800 p-2">
                  <p className="px-3 py-2 text-sm font-bold truncate">{user.name}</p>
                  <p className="px-3 pb-2 text-xs text-slate-500 truncate">{user.email}</p>
                  <Link href="/create-event" onClick={() => setDrop(false)} className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800 font-medium text-sm">➕ Create Event</Link>
                  <Link href="/manage-events" onClick={() => setDrop(false)} className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800 font-medium text-sm">📋 Manage Events</Link>
                  <Link href="/joined-events" onClick={() => setDrop(false)} className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800 font-medium text-sm">❤️ Joined Events</Link>
                  <Link href="/profile" onClick={() => setDrop(false)} className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800 font-medium text-sm">👤 My Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 font-medium text-sm">Logout</button>
                </div>
              )}
            </div>
          )}

          <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl" aria-label="Menu">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-amber-100 dark:border-slate-800 px-4 py-4 space-y-1 bg-[#FFF8ED] dark:bg-slate-950">
          <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-xl font-bold hover:bg-amber-50 dark:hover:bg-slate-800">Home</Link>
          <Link href="/upcoming" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-xl font-bold hover:bg-amber-50 dark:hover:bg-slate-800">Upcoming Events</Link>
          {user ? (
            <>
              <Link href="/create-event" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-xl font-bold hover:bg-amber-50 dark:hover:bg-slate-800">➕ Create Event</Link>
              <Link href="/manage-events" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-xl font-bold hover:bg-amber-50 dark:hover:bg-slate-800">📋 Manage Events</Link>
              <Link href="/joined-events" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-xl font-bold hover:bg-amber-50 dark:hover:bg-slate-800">❤️ Joined Events</Link>
              <Link href="/profile" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-xl font-bold hover:bg-amber-50 dark:hover:bg-slate-800">👤 My Profile</Link>
              <button onClick={handleLogout} className="w-full text-left px-3 py-3 rounded-xl font-bold text-rose-600">Logout</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="block text-center bg-teal-700 text-white font-bold px-3 py-3 rounded-full mt-2">Login</Link>
          )}
        </div>
      )}
    </header>
  );
}