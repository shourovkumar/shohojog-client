"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, useSession } from "@/lib/auth-client";
import { fetchServerToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Google diye login hoye fire asle token niye home e pathao
  useEffect(() => {
    if (session?.user) {
      fetchServerToken(session.user).then(() => router.push("/"));
    }
  }, [session, router]);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Thik email dao");
    if (!password) return toast.error("Password dao");
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Login hoy nai, email / password check koro");
      return;
    }
    // Session theke user niye server token nao
    // Ektu wait kore session update hote dao
    setTimeout(async () => {
      const res = await fetch("/api/auth/get-session");
      const data = await res.json().catch(() => ({}));
      if (data?.user) await fetchServerToken(data.user);
      toast.success("Login hoye gese!");
      router.push("/");
    }, 500);
  }

  async function handleGoogle() {
    await signIn.social({ provider: "google", callbackURL: "/login" });
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-white dark:bg-slate-900 rounded- p-7 md:p-8 border border-amber-100 dark:border-slate-800 shadow-xl">
        <h1 className="text-3xl font-black text-center">Welcome Back 👋</h1>
        <p className="text-center text-slate-500 text-sm mt-2">Shohojog e login koro</p>

        <button
          onClick={handleGoogle}
          className="w-full mt-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:shadow"
        >
          <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-black">G</span>
          Google diye Login
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tumar@email.com"
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-teal-600"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-teal-600"
            />
          </div>
          <button disabled={loading} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-full disabled:opacity-60">
            {loading ? "Login hocche..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-slate-500">
          Account nai? <Link href="/register" className="text-teal-700 dark:text-teal-400 font-bold">Register koro</Link>
        </p>
      </div>
    </div>
  );
}