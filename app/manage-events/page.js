"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { getMyEvents, updateEvent, deleteEvent } from "@/lib/api";

const TYPES = ["Cleanup", "Plantation", "Donation", "Winter Relief", "Food Drive", "Health Camp", "Education", "Others"];

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEventData, setDeleteEventData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({ title: "", description: "", type: "Cleanup", thumbnail: "", location: "", date: "" });
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Manage korte login korte hobe");
      router.push("/login");
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (user?.email) {
      getMyEvents(user.email).then((d) => setEvents(Array.isArray(d) ? d : d.events || [])).catch(() => setEvents([])).finally(() => setLoading(false));
    }
  }, [user?.email]);

  function openEdit(ev) {
    setEditEvent(ev);
    setForm({
      title: ev.title || "",
      description: ev.description || "",
      type: ev.type || "Cleanup",
      thumbnail: ev.thumbnail || "",
      location: ev.location || "",
      date: ev.date ? new Date(ev.date).toISOString().split("T")[0] : "",
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title dao");
    if (!form.description.trim()) return toast.error("Description dao");
    if (!form.location.trim()) return toast.error("Location dao");
    if (!form.date) return toast.error("Date dao");
    if (form.date < today) return toast.error("Past date hobe na");

    setSaving(true);
    try {
      const updated = await updateEvent(editEvent._id, form);
      const newEvent = updated.event || updated;
      setEvents((prev) => prev.map((ev) => (ev._id === editEvent._id ? { ...ev, ...form, ...newEvent } : ev)));
      toast.success("Event update hoye gese!");
      setEditEvent(null);
    } catch (err) {
      toast.error(err.message || "Update hoy nai");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteEvent(deleteEventData._id);
      setEvents((prev) => prev.filter((ev) => ev._id !== deleteEventData._id));
      toast.success("Event delete hoye gese");
      setDeleteEventData(null);
    } catch (err) {
      toast.error(err.message || "Delete hoy nai");
    } finally {
      setDeleting(false);
    }
  }

  if (isPending || loading) {
    return <div className="max-w-5xl mx-auto px-4 py-16 text-center">Loading...</div>;
  }
  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-black">Manage My Events</h1>
          <p className="text-slate-500 mt-1">Tumi create kora event gulo - {events.length} ta</p>
        </div>
        <Link href="/create-event" className="bg-teal-700 text-white font-bold px-5 py-3 rounded-full">+ Create New</Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded- p-12 text-center border mt-8">
          <p className="text-6xl">📭</p>
          <h2 className="text-2xl font-black mt-4">Ekhono kono event create koro nai</h2>
          <p className="text-slate-500 mt-2">Prothom event ta create koro</p>
          <Link href="/create-event" className="inline-block mt-5 bg-amber-500 text-white font-bold px-6 py-3 rounded-full">Create Event →</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {events.map((ev) => (
            <div key={ev._id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-amber-100 dark:border-slate-800 flex gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ev.thumbnail || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80"} alt={ev.title} className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-2xl shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex gap-2">
                  <span className="bg-teal-100 text-teal-800 text- font-bold px-2.5 py-1 rounded-full">{ev.type}</span>
                  <span className="bg-amber-100 text-amber-800 text- font-bold px-2.5 py-1 rounded-full">{ev.date ? new Date(ev.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}</span>
                </div>
                <h3 className="font-bold mt-2 line-clamp-2">{ev.title}</h3>
                <p className="text-xs text-slate-500 mt-1">📍 {ev.location}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(ev)} className="bg-teal-700 text-white text-sm font-bold px-4 py-2 rounded-full">Edit</button>
                  <button onClick={() => setDeleteEventData(ev)} className="bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full">Delete</button>
                  <Link href={`/events/${ev._id}`} className="bg-slate-100 dark:bg-slate-800 text-sm font-bold px-4 py-2 rounded-full">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editEvent && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <form onSubmit={handleUpdate} className="bg-white dark:bg-slate-900 rounded- w-full max-w-lg max-h- overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black">Edit Event</h2>
              <button type="button" onClick={() => setEditEvent(null)} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800">✕</button>
            </div>
            <div>
              <label className="text-sm font-bold">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full mt-1 px-4 py-3 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none" />
            </div>
            <div>
              <label className="text-sm font-bold">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full mt-1 px-4 py-3 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-bold">Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full mt-1 px-4 py-3 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none">
                  {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold">Date</label>
                <input type="date" min={today} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full mt-1 px-4 py-3 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full mt-1 px-4 py-3 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none" />
            </div>
            <div>
              <label className="text-sm font-bold">Thumbnail URL</label>
              <input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} className="w-full mt-1 px-4 py-3 rounded-2xl border bg-slate-50 dark:bg-slate-800 outline-none" />
            </div>
            <button disabled={saving} className="w-full bg-teal-700 text-white font-bold py-3.5 rounded-full disabled:opacity-60">{saving ? "Saving..." : "Save Changes"}</button>
          </form>
        </div>
      )}

      {deleteEventData && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded- w-full max-w-sm p-6 text-center">
            <p className="text-5xl">🗑️</p>
            <h2 className="text-xl font-black mt-3">Delete korba?</h2>
            <p className="text-sm text-slate-500 mt-2">"{deleteEventData.title}" - eita delete korle ar fire paba na.</p>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setDeleteEventData(null)} className="flex-1 bg-slate-100 dark:bg-slate-800 font-bold py-3 rounded-full">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 bg-rose-500 text-white font-bold py-3 rounded-full disabled:opacity-60">{deleting ? "Deleting..." : "Yes, Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}