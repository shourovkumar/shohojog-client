"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, signInWithGoogle } from "@/lib/auth-client";
import { fetchServerToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email) return toast.error("Please enter your email");
    if (!form.password) return toast.error("Please enter your password");
    setLoading(true);
    try {
      const res = await signIn.email({ email: form.email, password: form.password });
      if (res.error) throw new Error(res.error.message || "Login failed");
      const user = res.data?.user;
      if (user?.email) await fetchServerToken(user);
      toast.success("Welcome back!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Login failed. Check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      await signInWithGoogle();
    } catch {
      toast.error("Google login failed");
    }
  }

  return (
    <div className="min-h- flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded- p-6 sm:p-8 shadow-xl">
        <h1 className="text-3xl font-black text-center">Welcome Back</h1>
        <p className="text-center text-slate-500 text-sm mt-1">Login to join and create events.</p>
        <button onClick={handleGoogle} className="w-full mt-6 bg-white dark:bg-slate-800 border font-bold py-3.5 rounded-full flex items-center justify-center gap-2 text-sm">G Continue with Google</button>
        <div className="flex items-center gap-3 my-5"><span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" /><span className="text-xs text-slate-400">OR WITH EMAIL</span><span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" /></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-sm font-bold">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="w-full mt-1 px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none" /></div>
          <div><label className="text-sm font-bold">Password</label><div className="relative"><input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Your password" className="w-full mt-1 px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none pr-14" /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-teal-700">{showPass ? "Hide" : "Show"}</button></div></div>
          <button disabled={loading} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-full disabled:opacity-60">{loading ? "Logging in..." : "Login"}</button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-5">New to Shohojog? <Link href="/register" className="text-teal-700 font-bold">Create an account</Link></p>
      </div>
    </div>
  );
}