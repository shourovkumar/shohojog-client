"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);

  const linkClass = (href) =>
    pathname === href
      ? "bg-teal-700 text-white px-4 py-2 rounded-full font-semibold"
      : "text-slate-700 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-800 px-4 py-2 rounded-full font-medium";

  async function handleLogout() {
    await signOut();
    clearToken();
    toast.success("Logout hoye gese");
    setOpenDrop(false);
    setOpenMenu(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8EC]/95 dark:bg-slate-900/95 backdrop-blur border-b border-amber-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center text-2xl font-black">S</span>
          <span className="leading-none">
            <span className="block text-xl md:text-2xl font-black text-teal-800 dark:text-teal-300">Shohojog</span>
            <span className="hidden sm:block text-[11px] tracking-widest text-amber-600 font-bold">MANUSHER PASE MANUSH</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/upcoming" className={linkClass("/upcoming")}>Upcoming Events</Link>
          {user && <Link href="/create-event" className={linkClass("/create-event")}>Create Event</Link>}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 flex items-center justify-center text-lg"
            title="Dark / Light"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 rounded-full border-2 border-teal-700 text-teal-700 dark:text-teal-300 font-semibold">Login</Link>
              <Link href="/register" className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow">Register</Link>
            </div>
          ) : (
            <div className="relative">
              <button onClick={() => setOpenDrop(!openDrop)} className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-full pl-1 pr-3 py-1 shadow-sm">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-coral-500 bg-rose-400 text-white flex items-center justify-center font-bold">{user.name?.charAt(0)?.toUpperCase()}</span>
                )}
                <span className="hidden sm:block max-w-[110px] truncate text-sm font-semibold text-slate-800 dark:text-white">{user.name}</span>
                <span className="text-xs">▼</span>
              </button>
              {openDrop && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-4 py-3 bg-amber-50 dark:bg-slate-800">
                    <p className="font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link href="/create-event" onClick={() => setOpenDrop(false)} className="block px-4 py-2.5 hover:bg-amber-50 dark:hover:bg-slate-800 text-sm font-medium">➕ Create Event</Link>
                  <Link href="/manage-events" onClick={() => setOpenDrop(false)} className="block px-4 py-2.5 hover:bg-amber-50 dark:hover:bg-slate-800 text-sm font-medium">📋 Manage Events</Link>
                  <Link href="/joined-events" onClick={() => setOpenDrop(false)} className="block px-4 py-2.5 hover:bg-amber-50 dark:hover:bg-slate-800 text-sm font-medium">❤️ Joined Events</Link>
                  <Link href="/profile" onClick={() => setOpenDrop(false)} className="block px-4 py-2.5 hover:bg-amber-50 dark:hover:bg-slate-800 text-sm font-medium">👤 My Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 border-t">Logout</button>
                </div>
              )}
            </div>
          )}

          <button onClick={() => setOpenMenu(!openMenu)} className="md:hidden w-10 h-10 rounded-full bg-teal-700 text-white text-lg">☰</button>
        </div>
      </nav>

      {openMenu && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-[#FFF8EC] dark:bg-slate-900 border-t border-amber-100 dark:border-slate-800">
          <Link href="/" onClick={() => setOpenMenu(false)} className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 font-semibold">Home</Link>
          <Link href="/upcoming" onClick={() => setOpenMenu(false)} className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 font-semibold">Upcoming Events</Link>
          {user && <Link href="/create-event" onClick={() => setOpenMenu(false)} className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 font-semibold">Create Event</Link>}
          {!user && (
            <>
              <Link href="/login" onClick={() => setOpenMenu(false)} className="px-3 py-2.5 rounded-xl bg-teal-700 text-white text-center font-semibold">Login</Link>
              <Link href="/register" onClick={() => setOpenMenu(false)} className="px-3 py-2.5 rounded-xl bg-amber-500 text-white text-center font-semibold">Register</Link>
            </>
          )}
          {user && (
            <>
              <Link href="/manage-events" onClick={() => setOpenMenu(false)} className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 font-semibold">Manage Events</Link>
              <Link href="/joined-events" onClick={() => setOpenMenu(false)} className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 font-semibold">Joined Events</Link>
              <Link href="/profile" onClick={() => setOpenMenu(false)} className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 font-semibold">My Profile</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
