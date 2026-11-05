"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, updateUser } from "@/lib/auth-client";
import { getJoinedEvents, getMyEvents } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [joinedCount, setJoinedCount] = useState(0);
  const [createdCount, setCreatedCount] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
      getJoinedEvents(user.email).then((d) => setJoinedCount(Array.isArray(d) ? d.length : (d.joined || []).length)).catch(() => {});
      getMyEvents(user.email).then((d) => setCreatedCount(Array.isArray(d) ? d.length : (d.events || []).length)).catch(() => {});
    }
  }, [user]);

  async function handleUpdate(e) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter your name");
    setSaving(true);
    const { error } = await updateUser({ name: name.trim(), image: image.trim() || undefined });
    setSaving(false);
    if (error) {
      toast.error(error.message || "Could not update");
      return;
    }
    toast.success("Profile updated successfully!");
    window.location.reload();
  }

  if (isPending) return <div className="max-w-2xl mx-auto px-4 py-16 text-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-center">My Profile</h1>
      <div className="bg-white dark:bg-slate-900 rounded- p-6 md:p-8 mt-6 border border-amber-100 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col items-center">
          {user.image ? (
            <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-amber-400" />
          ) : (
            <span className="w-24 h-24 rounded-full bg-teal-700 text-white flex items-center justify-center text-4xl font-black">{user.name?.charAt(0)?.toUpperCase()}</span>
          )}
          <h2 className="text-xl font-black mt-3">{user.name}</h2>
          <p className="text-sm text-slate-500">{user.email}</p>
          <div className="flex gap-4 mt-4">
            <div className="bg-amber-50 dark:bg-slate-800 rounded-2xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-teal-700">{joinedCount}</p>
              <p className="text-xs text-slate-500 font-bold">Joined</p>
            </div>
            <div className="bg-amber-50 dark:bg-slate-800 rounded-2xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-600">{createdCount}</p>
              <p className="text-xs text-slate-500 font-bold">Created</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleUpdate} className="space-y-4 mt-8">
          <div>
            <label className="text-sm font-bold">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none focus:border-teal-600" />
          </div>
          <div>
            <label className="text-sm font-bold">Photo URL</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://... image link" className="w-full mt-1 px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none focus:border-teal-600" />
          </div>
          <div>
            <label className="text-sm font-bold">Email (Cannot be changed)</label>
            <input value={user.email} disabled className="w-full mt-1 px-4 py-3.5 rounded-2xl border bg-slate-100 dark:bg-slate-800 opacity-60" />
          </div>
          <button disabled={saving} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 rounded-full disabled:opacity-60">
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}