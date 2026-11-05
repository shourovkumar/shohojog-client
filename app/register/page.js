"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, signInWithGoogle } from "@/lib/auth-client";
import { fetchServerToken } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function validate() {
    if (!form.name.trim()) return "Please enter your name";
    if (!form.email) return "Please enter your email";
    if (!form.password) return "Please enter a password";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(form.password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(form.password)) return "Password must contain at least one lowercase letter";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);
    setLoading(true);
    try {
      const res = await signUp.email({ email: form.email, password: form.password, name: form.name, image: form.photoURL || "" });
      if (res.error) throw new Error(res.error.message || "Registration failed");
      const user = res.data?.user;
      if (user?.email) await fetchServerToken(user);
      toast.success("Account created! Welcome to Shohojog");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h- flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded- p-6 sm:p-8 shadow-xl">
        <h1 className="text-3xl font-black text-center">Create Account</h1>
        <p className="text-center text-slate-500 text-sm mt-1">Join the community and start doing good.</p>
        <button onClick={async () => { try { await signInWithGoogle(); } catch { toast.error("Google signup failed"); } }} className="w-full mt-6 bg-white dark:bg-slate-800 border font-bold py-3.5 rounded-full text-sm">G Continue with Google</button>
        <div className="flex items-center gap-3 my-5"><span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" /><span className="text-xs text-slate-400">OR WITH EMAIL</span><span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" /></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-sm font-bold">Full Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="w-full mt-1 px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none" /></div>
          <div><label className="text-sm font-bold">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="w-full mt-1 px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none" /></div>
          <div><label className="text-sm font-bold">Photo URL <span className="font-normal text-slate-400">(Optional)</span></label><input value={form.photoURL} onChange={(e) => setForm({ ...form, photoURL: e.target.value })} placeholder="https://..." className="w-full mt-1 px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none" /></div>
          <div><label className="text-sm font-bold">Password</label><div className="relative"><input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 6 chars, Upper + Lower" className="w-full mt-1 px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none pr-14" /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-teal-700">{showPass ? "Hide" : "Show"}</button></div><p className="text-xs text-slate-400 mt-1">Must contain uppercase, lowercase and at least 6 characters.</p></div>
          <button disabled={loading} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-full disabled:opacity-60">{loading ? "Creating account..." : "Create Account"}</button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-5">Already have an account? <Link href="/login" className="text-teal-700 font-bold">Login</Link></p>
      </div>
    </div>
  );
}